import { access, readFile } from 'node:fs/promises';
import { projects } from '../src/data.js';

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

console.log(`Content check passed: ${projects.length} complete case studies and required public assets.`);
