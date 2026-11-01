import { expect, test } from '@playwright/test';

test('renders the primary portfolio content without horizontal overflow', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Systems that feel');
  await expect(page.getByRole('main')).toBeVisible();
  const iconMask = await page.locator('.studio-flow-node .bi').first().evaluate((icon) => {
    const style = getComputedStyle(icon, '::before');
    return style.maskImage || style.webkitMaskImage;
  });
  expect(iconMask).not.toBe('none');
  const hasHorizontalOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
  expect(hasHorizontalOverflow).toBe(false);
});

test('keeps section grids aligned to the active viewport', async ({ page }) => {
  await page.goto('/#projects');
  await Promise.all([
    '.systems-grid',
    '.skills-section .stack-board',
    '.achievements-section .proof-grid',
    '.testimonial-rail',
    '.integration-grid',
  ].map((selector) => page.locator(selector).waitFor()));
  const columns = await page.evaluate(() => Object.fromEntries([
    ['projects', '.systems-grid'],
    ['skills', '.skills-section .stack-board'],
    ['proof', '.achievements-section .proof-grid'],
    ['principles', '.testimonial-rail'],
    ['integrations', '.integration-grid'],
  ].map(([name, selector]) => {
    const element = document.querySelector(selector);
    return [name, getComputedStyle(element).gridTemplateColumns.split(' ').length];
  })));
  const mobile = await page.evaluate(() => matchMedia('(max-width: 520px)').matches);
  const viewportWidth = page.viewportSize().width;
  expect(columns.projects).toBe(mobile ? 1 : viewportWidth <= 1080 ? 2 : 3);
  expect(columns.skills).toBe(mobile ? 1 : viewportWidth <= 1080 ? 2 : 3);
  expect(columns.proof).toBe(mobile ? 1 : 2);
  expect(columns.principles).toBe(mobile ? 1 : viewportWidth <= 1080 ? 2 : 3);
  expect(columns.integrations).toBe(mobile ? 1 : 2);
});

test('filters systems and announces the result count', async ({ page }) => {
  await page.goto('/#projects');
  await page.getByRole('button', { name: 'Java Tech', exact: true }).click();
  await expect(page.locator('.project-card')).toHaveCount(2);
  await expect(page.getByRole('button', { name: 'Open case study' })).toHaveCount(2);
  await expect(page.locator('#projectFilterStatus')).toContainText('Showing 2 Java systems');
});

test('opens a deep-linked case study and closes it with browser-compatible history', async ({ page }) => {
  await page.goto('/?case=resilient-order-lifecycle');
  const dialog = page.locator('dialog.project-dialog');
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole('heading', { level: 2 })).toContainText('order lifecycle');
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  await expect(page).not.toHaveURL(/case=/);
});

test('opens a case study from the system card button', async ({ page }) => {
  await page.goto('/#projects');
  await page.getByRole('button', { name: 'Open case study' }).first().click();
  await expect(page.locator('dialog.project-dialog')).toBeVisible();
  await expect(page).toHaveURL(/case=care-access-platform/);
});

test('supports keyboard command search', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true, bubbles: true, cancelable: true })));
  const search = page.getByRole('textbox', { name: 'Search commands' });
  await expect(search).toBeFocused();
  await search.fill('contact');
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#contact$/);
});

test('keeps the contact form concise and validates meaningful messages', async ({ page }) => {
  await page.goto('/#contact');
  await expect(page.locator('select')).toHaveCount(0);
  const message = page.getByRole('textbox', { name: 'How can I help?' });
  await expect(message).toHaveAttribute('maxlength', '3000');
  await expect(message).toHaveAttribute('minlength', '20');
});
