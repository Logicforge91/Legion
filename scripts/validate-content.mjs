import { access, readFile, readdir } from 'node:fs/promises';
import { projects } from '../src/data.js';

async function collectSourceFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(entries.map(async (entry) => {
    const resource = new URL(`${entry.name}${entry.isDirectory() ? '/' : ''}`, directory);
    if (entry.isDirectory()) return collectSourceFiles(resource);
    return /\.(?:js|jsx)$/.test(entry.name) ? [resource] : [];
  }));
  return files.flat();
}

const requiredText = ['slug', 'category', 'title', 'text', 'challenge', 'outcome'];
const slugs = new Set();

for (const project of projects) {
  for (const field of requiredText) {
    if (typeof project[field] !== 'string' || !project[field].trim()) {
      throw new Error(`Project "${project.title || 'untitled'}" is missing ${field}.`);
    }
  }
  if (slugs.has(project.slug)) throw new Error(`Duplicate project slug: ${project.slug}`);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(project.slug)) throw new Error(`Invalid project slug: ${project.slug}`);
  if (!Array.isArray(project.decisions) || project.decisions.length < 3) {
    throw new Error(`Project "${project.title}" needs at least three engineering decisions.`);
  }
  for (const field of ['request', 'event', 'result']) {
    if (typeof project.scenario?.[field] !== 'string' || !project.scenario[field].trim()) {
      throw new Error(`Project "${project.title}" is missing scenario.${field}.`);
    }
  }
  slugs.add(project.slug);
}

await Promise.all([
  access(new URL('../public/assets/resume.pdf', import.meta.url)),
  access(new URL('../public/og-image.png', import.meta.url)),
]);

const socialImage = await readFile(new URL('../public/og-image.png', import.meta.url));
const width = socialImage.readUInt32BE(16);
const height = socialImage.readUInt32BE(20);
if (width !== 1200 || height !== 630) {
  throw new Error(`Social preview must be 1200x630; received ${width}x${height}.`);
}

const sourceFiles = await collectSourceFiles(new URL('../src/', import.meta.url));
const sourceText = (await Promise.all(sourceFiles.map((file) => readFile(file, 'utf8')))).join('\n');
const iconCss = await readFile(new URL('../src/icons.css', import.meta.url), 'utf8');
const usedIcons = new Set(sourceText.match(/\bbi-[a-z0-9-]+\b/g) ?? []);
const configuredIcons = new Set(iconCss.match(/(?<=\.)bi-[a-z0-9-]+(?=::before)/g) ?? []);
const missingIcons = [...usedIcons].filter((icon) => !configuredIcons.has(icon)).sort();
const unusedIcons = [...configuredIcons].filter((icon) => !usedIcons.has(icon)).sort();

if (missingIcons.length) throw new Error(`Missing icon selectors: ${missingIcons.join(', ')}`);
if (unusedIcons.length) console.warn(`Unused icon selectors: ${unusedIcons.join(', ')}`);

console.log(`Content check passed: ${projects.length} case studies, ${usedIcons.size} icons, and required public assets.`);
