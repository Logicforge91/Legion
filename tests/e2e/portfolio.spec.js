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
  await page.goto('/');
  const selectors = [
    '.systems-grid',
    '.skills-section .toolkit-board',
    '.about-section .profile-card',
    '.testimonial-rail',
    '.integration-topology-grid',
  ];
  for (const selector of selectors) {
    const element = page.locator(selector);
    await element.scrollIntoViewIfNeeded();
    await element.waitFor();
  }
  const columns = await page.evaluate(() => Object.fromEntries([
    ['projects', '.systems-grid'],
    ['skills', '.skills-section .toolkit-board'],
    ['brand', '.about-section .profile-card'],
    ['principles', '.testimonial-rail'],
    ['integrations', '.integration-topology-grid'],
  ].map(([name, selector]) => {
    const element = document.querySelector(selector);
    return [name, getComputedStyle(element).gridTemplateColumns.split(' ').length];
  })));
  const mobile = await page.evaluate(() => matchMedia('(max-width: 520px)').matches);
  const viewportWidth = page.viewportSize().width;
  expect(columns.projects).toBe(mobile ? 1 : viewportWidth <= 1080 ? 2 : 3);
  expect(columns.skills).toBe(mobile ? 1 : viewportWidth <= 1080 ? 2 : 3);
  expect(columns.brand).toBe(2);
  expect(columns.principles).toBe(mobile ? 1 : viewportWidth <= 1080 ? 2 : 3);
  expect(columns.integrations).toBe(mobile ? 1 : 2);
});

test('filters systems and announces the result count', async ({ page }) => {
  await page.goto('/#projects');
  const javaFilter = page.getByRole('button', { name: 'Java Tech', exact: true });
  await javaFilter.click();
  await expect(javaFilter).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('.project-card')).toHaveCount(2);
  await expect(page.locator('#projectFilterStatus')).toContainText('Showing 2 Java systems');
});

test('tracks sections that load after the initial render', async ({ page }) => {
  await page.goto('/');
  const contactSection = page.locator('#contact');
  await contactSection.waitFor();
  await contactSection.scrollIntoViewIfNeeded();
  await expect(page.locator('#navLinks a[href="#contact"]')).toHaveClass(/active/);
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

test('mobile navigation announces its expanded state and closes after navigation', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const toggle = page.getByRole('button', { name: 'Open navigation' });
  await toggle.click();
  await expect(page.getByRole('button', { name: 'Close navigation' })).toHaveAttribute('aria-expanded', 'true');
  await page.getByRole('link', { name: 'Portfolio', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Open navigation' })).toHaveAttribute('aria-expanded', 'false');
  await expect(page).toHaveURL(/#projects$/);
});

test('command palette closes on Escape and returns to the page', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Control+k');
  const dialog = page.getByRole('dialog', { name: 'Portfolio commands' });
  await expect(dialog).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Search commands' })).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
});

test('announces share feedback through a status region when clipboard is used', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'share', { configurable: true, value: undefined });
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText: async (text) => { window.__copiedText = text; } },
    });
  });
  await page.goto('/');
  await page.getByRole('button', { name: 'Share QYVERON' }).click();
  await expect(page.getByRole('status')).toContainText('QYVERON website link copied to clipboard.');
  expect(await page.evaluate(() => window.__copiedText)).toBe('https://legion91.netlify.app/');
});

test('contact form reports success and resets fields after a successful submission', async ({ page }) => {
  await page.route('**/api/contact', (route) => route.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' }));
  await page.goto('/#contact');
  await page.getByRole('textbox', { name: 'Your name' }).fill('Jane Smith');
  await page.getByRole('textbox', { name: 'Work email' }).fill('jane@example.com');
  await page.getByRole('textbox', { name: 'How can I help?' }).fill('I would like to discuss a potential project.');
  await page.getByRole('button', { name: 'Send message' }).click();
  await expect(page.getByText('Message received. I will reply soon.')).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Your name' })).toHaveValue('');
});

test('respects reduced-motion preferences for the technology index', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.getByText('Motion minimized')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Pause flow' })).toHaveCount(0);
});
