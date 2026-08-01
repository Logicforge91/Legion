import { expect, test } from '@playwright/test';

test('renders the primary portfolio content without horizontal overflow', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('backend layer');
  await expect(page.getByRole('main')).toBeVisible();
  const hasHorizontalOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
  expect(hasHorizontalOverflow).toBe(false);
});

test('filters systems and announces the result count', async ({ page }) => {
  await page.goto('/#projects');
  await page.getByRole('button', { name: 'integration', exact: true }).click();
  await expect(page.locator('.project-card')).toHaveCount(2);
  await expect(page.locator('#projectFilterStatus')).toContainText('Showing 2 integration systems');
});

test('opens a deep-linked case study and closes it with browser-compatible history', async ({ page }) => {
  await page.goto('/?case=resilient-order-lifecycle');
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole('heading', { level: 2 })).toContainText('order lifecycle');
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  await expect(page).not.toHaveURL(/case=/);
});

test('supports keyboard command search', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('ControlOrMeta+k');
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
