import { test, expect } from '@playwright/test';
import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectsDir = path.join(__dirname, '..', 'src', 'content', 'projects');

// Read the real project content collection so this suite stays in sync with
// the CMS data instead of hardcoding a slug list that will drift.
const projects = readdirSync(projectsDir)
  .filter((f) => f.endsWith('.json'))
  .map((f) => {
    const data = JSON.parse(readFileSync(path.join(projectsDir, f), 'utf-8'));
    return { slug: f.replace(/\.json$/, ''), category: data.category, title: data.title };
  });

const SERVICE_SLUGS = ['graffiti', 'heritage', 'fire-damage', 'industrial', 'paint-removal', 'surface-preparation'];
const WORK_CATEGORY_SLUGS = [...SERVICE_SLUGS, 'general'];

test.describe('homepage', () => {
  test('loads with hero content', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Pro City Laser Removal and Restoration/);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('hero shows the Peterborough Cathedral graffiti-removal photos', async ({ page }) => {
    // Regression check: the hero pins to a specific project (see
    // src/pages/index.astro) and has previously both silently fallen back to
    // a grey placeholder mock, and fallen back to the wrong project's photos.
    await page.goto('/');
    const slider = page.locator('[data-before-after-slider]').first();
    await expect(slider).toBeVisible();
    await expect(slider.locator('img[alt*="Peterborough Cathedral"]').first()).toBeVisible();
  });

  test('primary navigation reaches every top-level page', async ({ page }) => {
    const links: Array<[string, string]> = [
      ['Services', '/services/'],
      ['Work', '/work/'],
      ['About', '/about/'],
      ['Get in touch', '/contact/'],
    ];
    const nav = page.getByRole('navigation', { name: 'Main navigation' });

    for (const [label, expectedPath] of links) {
      await page.goto('/');
      await nav.getByRole('link', { name: label, exact: true }).click();
      await expect(page).toHaveURL(new RegExp(`${expectedPath}$`));
    }
  });
});

test.describe('services', () => {
  test('services index lists all six services', async ({ page }) => {
    await page.goto('/services/');
    const main = page.locator('main');
    for (const slug of SERVICE_SLUGS) {
      await expect(main.locator(`a[href="/services/${slug}/"]`)).toBeVisible();
    }
  });

  for (const slug of SERVICE_SLUGS) {
    test(`service page /services/${slug}/ loads`, async ({ page }) => {
      const response = await page.goto(`/services/${slug}/`);
      expect(response?.ok()).toBeTruthy();
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    });
  }
});

test.describe('work', () => {
  test('work index lists every project category, including general', async ({ page }) => {
    await page.goto('/work/');
    const filterNav = page.getByRole('navigation', { name: 'Filter projects by category' });
    for (const slug of WORK_CATEGORY_SLUGS) {
      await expect(filterNav.locator(`a[href="/work/${slug}/"]`)).toBeVisible();
    }
  });

  test('every project detail page loads and renders its photo evidence', async ({ page }) => {
    for (const p of projects) {
      const response = await page.goto(`/work/${p.category}/${p.slug}/`);
      expect(response?.ok(), `${p.slug} should return a successful response`).toBeTruthy();
      await expect(page.getByRole('heading', { level: 1, name: p.title })).toBeVisible();

      const hasEvidence =
        (await page.locator('[data-before-after-slider]').count()) +
        (await page.locator('figure img').count()) +
        (await page.locator('iframe').count());
      expect(hasEvidence, `${p.slug} should render a slider, image, or video`).toBeGreaterThan(0);
    }
  });
});

test.describe('contact', () => {
  test('enquiry form has the required fields', async ({ page }) => {
    await page.goto('/contact/');
    const form = page.locator('form[name="enquiry"]');
    await expect(form).toBeVisible();
    await expect(form.locator('#name')).toHaveAttribute('required', '');
    await expect(form.locator('#email')).toHaveAttribute('required', '');
    await expect(form.locator('#message')).toHaveAttribute('required', '');
  });
});

test.describe('cookie consent', () => {
  test('banner can be accepted and stays dismissed after reload', async ({ page }) => {
    await page.goto('/');
    const banner = page.locator('#cookie-banner');
    await expect(banner).toBeVisible();

    await page.getByRole('button', { name: 'Accept all cookies' }).click();
    await expect(banner).toBeHidden();

    await page.reload();
    await expect(banner).toBeHidden();
  });
});
