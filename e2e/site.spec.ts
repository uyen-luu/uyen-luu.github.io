import { expect, test, type Page } from '@playwright/test';
import { personal, skills } from './data';

function collectConsoleErrors(page: Page): string[] {
  const errors: string[] = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  page.on('pageerror', (err) => errors.push(err.message));
  return errors;
}

const bioHeading = (page: Page) => page.getByRole('heading', { level: 1 }).filter({ hasText: personal.name });

test('home page renders without errors', { tag: '@smoke' }, async ({ page }) => {
  const errors = collectConsoleErrors(page);
  await page.goto('/');

  await expect(page).toHaveTitle('Uyen Luu');
  await expect(page.locator('app-header').getByRole('link', { name: 'UYEN LUU' })).toBeVisible();
  await expect(bioHeading(page)).toBeVisible();
  await expect(page.locator('#skills')).toBeAttached();
  expect(errors).toEqual([]);
});

test('bio shows name, designation, socials and resume', { tag: '@smoke' }, async ({ page }) => {
  await page.goto('/');

  await expect(bioHeading(page)).toContainText(personal.designation);

  const bio = page.locator('app-bio');
  for (const social of personal.socials) {
    const link = bio.locator(`a[href="${social.uri}"]`);
    await expect(link).toHaveCount(1);
    await expect(link).toHaveAttribute('target', '_blank');
  }

  const resume = bio.getByRole('button', { name: 'Get Resume' });
  await expect(resume).toHaveAttribute('href', personal.resume);
  await expect(resume).toHaveAttribute('target', '_blank');
});

test('skills page lists every skill with a loaded image', { tag: '@smoke' }, async ({ page }) => {
  await page.goto('/skills');
  await expect(page).toHaveTitle('UL | Skills');

  const categories = [...new Set(skills.map((s) => s.category))];
  await expect(page.locator('app-skill h2')).toHaveText(categories);

  const images = page.locator('app-skill app-skill-item img');
  await expect(images).toHaveCount(skills.length);

  // Images are lazy, so bring each into view before checking it decoded.
  for (const img of await images.all()) {
    await img.scrollIntoViewIfNeeded();
    await expect
      .poll(() => img.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0), {
        message: `image ${await img.getAttribute('src')} should load`,
      })
      .toBe(true);
  }
});

test.describe('deep links', () => {
  test('/skills survives a direct load and a reload', { tag: '@smoke' }, async ({ page }) => {
    await page.goto('/skills');
    await expect(page.locator('app-skill h2').first()).toBeVisible();

    await page.reload();
    await expect(page).toHaveURL(/\/skills$/);
    await expect(page.locator('app-skill h2').first()).toBeVisible();
  });

  test('unknown path shows the 404 page', { tag: '@smoke' }, async ({ page }) => {
    await page.goto('/this-page-does-not-exist');
    await expect(page).toHaveTitle('UL | Not Found');
    await expect(page.getByRole('heading', { name: '404 - Page not found' })).toBeVisible();
  });
});

test('SEO and social meta tags are present', { tag: '@smoke' }, async ({ page, request }) => {
  await page.goto('/');

  const meta = (selector: string) => page.locator(`head ${selector}`);
  await expect(meta('meta[name="description"]')).toHaveAttribute('content', /\S/);
  await expect(meta('link[rel="canonical"]')).toHaveAttribute('href', 'https://uyen-luu.github.io/');
  await expect(meta('meta[property="og:title"]')).toHaveAttribute('content', /\S/);
  await expect(meta('meta[property="og:description"]')).toHaveAttribute('content', /\S/);
  await expect(meta('meta[property="og:url"]')).toHaveAttribute('content', 'https://uyen-luu.github.io/');
  await expect(meta('meta[name="twitter:card"]')).toHaveAttribute('content', /\S/);

  // og:image is an absolute production URL; check the same path on the site under test.
  const ogImage = await meta('meta[property="og:image"]').getAttribute('content');
  expect(ogImage).toMatch(/^https:\/\//);
  const res = await request.get(new URL(ogImage!).pathname);
  expect(res.status()).toBe(200);
  expect(res.headers()['content-type']).toMatch(/^image\//);
});

test.describe('mobile', () => {
  test.use({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });

  test('home page fits a phone screen', { tag: '@smoke' }, async ({ page }) => {
    await page.goto('/');

    await expect(bioHeading(page)).toBeVisible();
    await expect(page.getByRole('button', { name: 'Get Resume' })).toBeVisible();

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow, 'page should not scroll horizontally').toBeLessThanOrEqual(0);
  });
});
