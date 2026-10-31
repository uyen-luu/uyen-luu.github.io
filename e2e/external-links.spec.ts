import { expect, test } from '@playwright/test';
import { personal } from './data';

// Only meaningful against the deployed site; it hits third-party servers.
test.skip(!process.env['E2E_BASE_URL'], 'external links are only checked against the live site');

const links = [personal.resume, ...personal.socials.map((s) => s.uri)].filter((uri) => uri.startsWith('http'));

test('resume and social links do not 404', { tag: '@smoke' }, async ({ request }) => {
  for (const uri of links) {
    // Redirects (e.g. to a login page) are fine; only a missing page is a failure.
    // Some sites (LinkedIn) drop bot requests outright; that says nothing about the link, so just note it.
    try {
      const res = await request.get(uri, { maxRedirects: 0, failOnStatusCode: false });
      expect.soft(res.status(), uri).not.toBe(404);
    } catch (err) {
      test.info().annotations.push({ type: 'warning', description: `${uri}: ${(err as Error).message}` });
    }
  }
});
