import { mkdir, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { chromium } from '@playwright/test';

const iconDirectory = new URL('../public/icons/', import.meta.url);
const sourceIcon = await readFile(new URL('../public/favicon-sk.svg', import.meta.url), 'utf8');
const iconData = `data:image/svg+xml;base64,${Buffer.from(sourceIcon).toString('base64')}`;
const iconSizes = [
  { size: 180, name: 'apple-touch-icon.png' },
  { size: 192, name: 'icon-192.png' },
  { size: 512, name: 'icon-512.png' },
];

await mkdir(iconDirectory, { recursive: true });
const browser = await chromium.launch({ headless: true });

try {
  const page = await browser.newPage({ deviceScaleFactor: 1 });

  for (const { size, name } of iconSizes) {
    await page.setViewportSize({ width: size, height: size });
    await page.setContent(`
      <!doctype html>
      <html>
        <head>
          <style>
            html, body { width: ${size}px; height: ${size}px; margin: 0; overflow: hidden; }
            img { display: block; width: 100%; height: 100%; }
          </style>
        </head>
        <body><img src="${iconData}" alt=""></body>
      </html>
    `);
    await page.locator('img').screenshot({ path: fileURLToPath(new URL(name, iconDirectory)) });
  }
} finally {
  await browser.close();
}

console.log(`Generated ${iconSizes.length} application icons in ${fileURLToPath(iconDirectory)}`);
