import { mkdir, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { chromium } from '@playwright/test';

const iconDirectory = new URL('../public/icons/', import.meta.url);
const sourceIcon = await readFile(new URL('../public/favicon-qy.svg', import.meta.url), 'utf8');
const socialImage = await readFile(new URL('../public/og-image-qy.svg', import.meta.url), 'utf8');
const iconData = `data:image/svg+xml;base64,${Buffer.from(sourceIcon).toString('base64')}`;
const socialImageData = `data:image/svg+xml;base64,${Buffer.from(socialImage).toString('base64')}`;
const iconSizes = [
  { size: 180, name: 'apple-touch-qy.png' },
  { size: 192, name: 'icon-qy-192.png' },
  { size: 512, name: 'icon-qy-512.png' },
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

  await page.setViewportSize({ width: 1200, height: 630 });
  await page.setContent(`
    <!doctype html>
    <html>
      <head>
        <style>
          html, body { width: 1200px; height: 630px; margin: 0; overflow: hidden; }
          img { display: block; width: 100%; height: 100%; }
        </style>
      </head>
      <body><img src="${socialImageData}" alt=""></body>
    </html>
  `);
  await page.locator('img').screenshot({ path: fileURLToPath(new URL('../public/og-image-qy.png', import.meta.url)) });
} finally {
  await browser.close();
}

console.log(`Generated ${iconSizes.length} application icons and the QYVERON social preview.`);
