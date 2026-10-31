import { expect, test, type Page } from '@playwright/test';
import { panels, personal, projects, skills } from './data';

// The page scrolls inside #scrollContainer, not the window.
async function scrollContainerTo(page: Page, top: number | 'bottom'): Promise<void> {
  await page.locator('#scrollContainer').evaluate((el, to) => {
    el.scrollTo({ top: to === 'bottom' ? el.scrollHeight : to, behavior: 'instant' });
  }, top);
}

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('app-bio h1')).toContainText(personal.name);
});

test('about section shows the description and avatar', async ({ page }) => {
  const about = page.locator('#about');
  await expect(about).toContainText(personal.description);

  const avatar = about.getByRole('img', { name: personal.name });
  await avatar.scrollIntoViewIfNeeded();
  await expect
    .poll(() => avatar.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0))
    .toBe(true);
});

for (const panel of panels) {
  test(`${panel.title} panel lists every entry with its animation`, async ({ page }) => {
    const section = page.locator(`#${panel.id}`);
    await expect(section).toContainText(panel.title);
    await expect(section.locator('app-glow-card')).toHaveCount(panel.items.length);

    for (const item of panel.items) {
      const card = section.locator('app-glow-card').filter({ hasText: item.title });
      await expect(card).toContainText(item.organization.trim());
      await expect(card).toContainText(item.duration);
      if (item.url) {
        const link = card.getByRole('link', { name: item.title, exact: true });
        await expect(link).toHaveAttribute('href', item.url);
        await expect(link).toHaveAttribute('target', '_blank');
        await expect(link).toHaveAttribute('rel', /noopener/);
      }
    }

    await section.scrollIntoViewIfNeeded();
    await expect(section.locator('ng-lottie svg')).toBeAttached();
  });
}

test('projects section lists every project with its role', async ({ page }) => {
  const section = page.locator('#projects');
  await expect(section.locator('.sticky-card')).toHaveCount(projects.length);
  for (const project of projects) {
    const card = section.locator('.sticky-card').filter({ hasText: project.name });
    await expect(card).toContainText(project.position);
  }
});

test('skills strip shows every skill and links to the skills page', async ({ page }) => {
  const widget = page.locator('#skills');
  await expect(widget.locator('app-skill-item')).toHaveCount(skills.length);

  await widget.getByRole('link', { name: 'All skills' }).click();
  await expect(page).toHaveURL(/\/skills$/);
  await expect(page).toHaveTitle('UL | Skills');
  await expect(page.locator('app-skill h2').first()).toBeVisible();
});

test('contact section shows email, phone, address and socials', async ({ page }) => {
  const contact = page.locator('#contact');
  await expect(contact.getByRole('link', { name: personal.email })).toHaveAttribute('href', `mailto:${personal.email}`);
  await expect(contact.getByRole('link', { name: personal.phone })).toHaveAttribute('href', `tel:${personal.phone}`);

  const address = contact.getByRole('link', { name: personal.address });
  await expect(address).toHaveAttribute('href', `http://maps.google.com/?q=${personal.address}`);
  await expect(address).toHaveAttribute('target', '_blank');

  // Social links are the icon-only anchors (the email also appears as a text link above).
  for (const social of personal.socials) {
    await expect(contact.locator(`a[href="${social.uri}"]:has(> i)`)).toHaveCount(1);
  }

  // The form is a placeholder until sending is implemented.
  await expect(contact.getByRole('button', { name: 'Send Message' })).toBeDisabled();
});

test('footer shows the copyright line', async ({ page }) => {
  const footer = page.locator('app-footer');
  await expect(footer).toContainText(`Copyright © ${new Date().getFullYear()}`);
  await expect(footer.getByRole('link', { name: personal.name })).toHaveAttribute('href', personal.socials[0].uri);
});

test.describe('header navigation', () => {
  const sections = ['about', 'experience', 'certs', 'skills', 'education', 'projects'];

  for (const id of sections) {
    test(`header link scrolls to #${id}`, async ({ page }) => {
      const link = page.locator(`app-header a[href="/#${id}"]`);
      await expect(link).toHaveCount(1);
      // Wait for the data-driven sections to render so the page has its final height.
      await expect(page.locator('#projects .sticky-card').first()).toBeAttached();

      await link.click();
      await expect(page).toHaveURL(new RegExp(`/#${id}$`));
      await expect(page.locator(`#${id}`)).toBeInViewport();
    });
  }
});

test('scroll-to-top button appears after scrolling and returns to the top', async ({ page }) => {
  const button = page.getByRole('button', { name: 'Scroll to top' });
  await expect(button).toBeHidden();

  await scrollContainerTo(page, 800);
  await expect(button).toBeVisible();

  await button.click();
  await expect.poll(() => page.locator('#scrollContainer').evaluate((el) => el.scrollTop)).toBe(0);
  await expect(button).toBeHidden();
});

test('no requests fail while scrolling through the home page', async ({ page }) => {
  const failures: string[] = [];
  page.on('requestfailed', (req) => failures.push(`${req.url()} (${req.failure()?.errorText})`));
  page.on('response', (res) => {
    if (res.status() >= 400) failures.push(`${res.url()} (${res.status()})`);
  });

  // Step down the page so lazy images and animations load.
  const height = await page.locator('#scrollContainer').evaluate((el) => el.scrollHeight);
  for (let top = 0; top < height; top += 600) {
    await scrollContainerTo(page, top);
    await page.waitForTimeout(100);
  }
  await scrollContainerTo(page, 'bottom');
  await page.waitForLoadState('networkidle');

  expect(failures).toEqual([]);
});
