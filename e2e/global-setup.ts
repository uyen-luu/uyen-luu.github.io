// When checking the live site right after a deploy, GitHub Pages can keep serving
// the previous build for a few minutes. Wait until the page carries the build
// marker CI wrote for this commit, so the smoke tests run against the new build.
const POLL_INTERVAL_MS = 10_000;
const TIMEOUT_MS = 5 * 60_000;

async function readBuildMarker(url: string): Promise<string | undefined> {
  try {
    const res = await fetch(url, { cache: 'no-store' });
    const html = await res.text();
    return /<meta\s+name="build"\s+content="([^"]*)"/i.exec(html)?.[1];
  } catch {
    return undefined;
  }
}

export default async function globalSetup(): Promise<void> {
  const baseURL = process.env['E2E_BASE_URL'];
  const expectedSha = process.env['E2E_EXPECTED_SHA'];
  if (!baseURL || !expectedSha) return;

  const deadline = Date.now() + TIMEOUT_MS;
  let seen: string | undefined;
  for (;;) {
    seen = await readBuildMarker(baseURL);
    if (seen === expectedSha) {
      console.log(`Live site is serving build ${expectedSha}.`);
      return;
    }
    if (Date.now() + POLL_INTERVAL_MS > deadline) break;
    console.log(`Waiting for build ${expectedSha} on ${baseURL} (currently ${seen ?? 'no marker'})...`);
    await new Promise((r) => setTimeout(r, POLL_INTERVAL_MS));
  }

  throw new Error(
    `${baseURL} did not serve build ${expectedSha} within ${TIMEOUT_MS / 60_000} minutes ` +
      `(last build marker seen: ${seen ?? 'none'}). The deploy may have failed or not propagated yet.`,
  );
}
