import { chromium } from '@playwright/test';

const browser = await chromium.launch({ headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  page.on('console', (message) => console.log(`console ${message.type()}: ${message.text()}`));
  page.on('pageerror', (error) => console.log(`pageerror: ${error.message}`));
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  console.log(`title: ${await page.title()}; content: ${(await page.locator('body').innerText()).slice(0, 200)}`);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);
  await page.screenshot({ path: 'hero-check.png' });
  await page.locator('#integrations').scrollIntoViewIfNeeded();
  await page.locator('.integration-topology').waitFor({ state: 'visible', timeout: 10000 });
  await page.waitForTimeout(300);
  await page.screenshot({ path: 'integration-check.png' });
} finally {
  await browser.close();
}
