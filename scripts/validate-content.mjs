import { access, readFile, readdir } from 'node:fs/promises';
import { articles, profile, projects, services, skills } from '../src/data/portfolio.js';
import { projectFilters } from '../src/config/projectFilters.js';

async function collectSourceFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(entries.map(async (entry) => {
    const resource = new URL(`${entry.name}${entry.isDirectory() ? '/' : ''}`, directory);
    if (entry.isDirectory()) return collectSourceFiles(resource);
    return /\.(?:js|jsx)$/.test(entry.name) ? [resource] : [];
  }));
  return files.flat();
}

const requiredText = ['slug', 'category', 'title', 'text'];
for (const field of ['name', 'shortName', 'tagline', 'industry', 'vision', 'role', 'availability', 'summary', 'introduction', 'approach']) {
  if (typeof profile[field] !== 'string' || !profile[field].trim()) {
    throw new Error(`Portfolio profile is missing ${field}.`);
  }
}
for (const field of ['personality', 'coreValues', 'focus']) {
  if (!Array.isArray(profile[field]) || !profile[field].length || profile[field].some((item) => typeof item !== 'string' || !item.trim())) {
    throw new Error(`Company profile needs a valid ${field} list.`);
  }
}
if (!services.length || services.some((service) => (
  ['title', 'description', 'capability', 'icon'].some((field) => typeof service[field] !== 'string' || !service[field].trim())
))) {
  throw new Error('Each portfolio service needs a title, description, capability, and icon.');
}
const slugs = new Set();
const allowedFilters = new Set(projectFilters.map(([value]) => value).filter((value) => value !== 'all'));

for (const project of projects) {
  for (const field of requiredText) {
    if (typeof project[field] !== 'string' || !project[field].trim()) {
      throw new Error(`Project "${project.title || 'untitled'}" is missing ${field}.`);
    }
  }
  if (slugs.has(project.slug)) throw new Error(`Duplicate project slug: ${project.slug}`);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(project.slug)) throw new Error(`Invalid project slug: ${project.slug}`);
  if (!Array.isArray(project.filters) || !project.filters.length) {
    throw new Error(`Project "${project.title}" needs at least one category filter.`);
  }
  const projectFilterSet = new Set(project.filters);
  if (projectFilterSet.size !== project.filters.length) {
    throw new Error(`Project "${project.title}" has duplicate category filters.`);
  }
  for (const filter of project.filters) {
    if (!allowedFilters.has(filter)) {
      throw new Error(`Project "${project.title}" uses unknown filter "${filter}".`);
    }
  }
  slugs.add(project.slug);
}

for (const [index, skill] of skills.entries()) {
  for (const field of ['icon', 'title', 'description']) {
    if (typeof skill[field] !== 'string' || !skill[field].trim()) {
      throw new Error(`Skill ${index + 1} is missing ${field}.`);
    }
  }
}

const articleSlugs = new Set();
for (const [index, article] of articles.entries()) {
  for (const field of ['slug', 'topic', 'title', 'summary', 'readTime']) {
    if (typeof article[field] !== 'string' || !article[field].trim()) {
      throw new Error(`Article ${index + 1} is missing ${field}.`);
    }
  }
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(article.slug) || articleSlugs.has(article.slug)) {
    throw new Error(`Article ${index + 1} has an invalid or duplicate slug: ${article.slug}`);
  }
  if (!Array.isArray(article.tags) || !article.tags.length || !Array.isArray(article.sections) || !article.sections.length) {
    throw new Error(`Article "${article.title}" needs topic tags and tutorial sections.`);
  }
  for (const section of article.sections) {
    if (
      typeof section.heading !== 'string' || !section.heading.trim()
      || typeof section.body !== 'string' || !section.body.trim()
      || !Array.isArray(section.points) || !section.points.length
      || section.points.some((point) => typeof point !== 'string' || !point.trim())
    ) {
      throw new Error(`Article "${article.title}" has an incomplete tutorial section.`);
    }
  }
  articleSlugs.add(article.slug);
}

await Promise.all([
  access(new URL('../public/og-image-qy.png', import.meta.url)),
  access(new URL('../public/favicon-qy.svg', import.meta.url)),
  access(new URL('../public/icons/apple-touch-qy.png', import.meta.url)),
]);

const webManifest = JSON.parse(await readFile(new URL('../public/site.webmanifest', import.meta.url), 'utf8'));
if (webManifest.id !== '/' || webManifest.scope !== '/' || webManifest.start_url !== '/') {
  throw new Error('Web app manifest identity, scope, and start URL must stay rooted at the site origin.');
}
if (!Array.isArray(webManifest.icons) || !webManifest.icons.length) {
  throw new Error('Web app manifest must declare at least one icon.');
}

const siteOrigin = 'https://legion91.netlify.app';
const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const canonicalUrl = html.match(/<link rel="canonical" href="([^"]+)"\s*\/?\s*>/)?.[1];
if (canonicalUrl !== `${siteOrigin}/`) {
  throw new Error(`Canonical URL must point to ${siteOrigin}/.`);
}
const structuredDataText = html.match(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/)?.[1];
if (!structuredDataText) throw new Error('Page must include JSON-LD structured data.');
const structuredData = JSON.parse(structuredDataText);
if (
  structuredData['@context'] !== 'https://schema.org'
  || structuredData['@type'] !== 'Organization'
  || structuredData.name !== profile.name
  || structuredData.alternateName !== profile.shortName
  || structuredData.url !== canonicalUrl
  || structuredData.slogan !== profile.tagline
) {
  throw new Error('Organization JSON-LD must match the portfolio brand and canonical URL.');
}

const sitemap = await readFile(new URL('../public/sitemap.xml', import.meta.url), 'utf8');
if (!sitemap.includes(`<loc>${canonicalUrl}</loc>`)) {
  throw new Error('Sitemap must include the canonical portfolio URL.');
}
const robots = await readFile(new URL('../public/robots.txt', import.meta.url), 'utf8');
if (!robots.includes(`Sitemap: ${siteOrigin}/sitemap.xml`)) {
  throw new Error('robots.txt must reference the portfolio sitemap.');
}

const publicDirectory = new URL('../public/', import.meta.url);
for (const icon of webManifest.icons) {
  if (!icon.src?.startsWith('/') || icon.src.includes('..') || !icon.type || !icon.sizes) {
    throw new Error(`Invalid web app icon declaration: ${JSON.stringify(icon)}`);
  }
  const iconFile = new URL(icon.src.slice(1), publicDirectory);
  await access(iconFile);

  if (icon.type === 'image/png') {
    const png = await readFile(iconFile);
    const dimensions = `${png.readUInt32BE(16)}x${png.readUInt32BE(20)}`;
    if (icon.sizes !== dimensions) {
      throw new Error(`Web app icon ${icon.src} declares ${icon.sizes}, but its PNG is ${dimensions}.`);
    }
  }
}

const socialImage = await readFile(new URL('../public/og-image-qy.png', import.meta.url));
const width = socialImage.readUInt32BE(16);
const height = socialImage.readUInt32BE(20);
if (width !== 1200 || height !== 630) {
  throw new Error(`Social preview must be 1200x630; received ${width}x${height}.`);
}

const sourceFiles = await collectSourceFiles(new URL('../src/', import.meta.url));
const sourceText = (await Promise.all(sourceFiles.map((file) => readFile(file, 'utf8')))).join('\n');
const iconCss = await readFile(new URL('../src/styles/icons.css', import.meta.url), 'utf8');
const usedIcons = new Set(sourceText.match(/\bbi-[a-z0-9-]+\b/g) ?? []);
const configuredIcons = new Set(iconCss.match(/(?<=\.)bi-[a-z0-9-]+(?=::before)/g) ?? []);
const missingIcons = [...usedIcons].filter((icon) => !configuredIcons.has(icon)).sort();
const unusedIcons = [...configuredIcons].filter((icon) => !usedIcons.has(icon)).sort();

if (missingIcons.length) throw new Error(`Missing icon selectors: ${missingIcons.join(', ')}`);
if (unusedIcons.length) console.warn(`Unused icon selectors: ${unusedIcons.join(', ')}`);

console.log(`Content check passed: ${projects.length} project examples, ${services.length} services, ${articles.length} articles, ${skills.length} capabilities, ${usedIcons.size} icons, and ${webManifest.icons.length} valid app icons.`);
