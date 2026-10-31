import { defineConfig, devices } from '@playwright/test';

// Two targets:
// - E2E_BASE_URL unset: serve the local production build and run every test (pre-deploy gate).
// - E2E_BASE_URL set (e.g. https://uyen-luu.github.io): run only @smoke tests against that site.
const liveURL = process.env['E2E_BASE_URL'];
const isCI = !!process.env['CI'];
const localPort = 4300;

if (process.env['npm_lifecycle_event'] === 'e2e:live' && !liveURL) {
  throw new Error('e2e:live needs E2E_BASE_URL, e.g. E2E_BASE_URL=https://uyen-luu.github.io');
}

export default defineConfig({
  testDir: 'e2e',
  globalSetup: './e2e/global-setup.ts',
  grep: liveURL ? /@smoke/ : undefined,
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 1 : 0,
  reporter: isCI
    ? [['github'], ['html', { open: 'never' }], ['./e2e/summary-reporter.ts']]
    : [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: liveURL ?? `http://localhost:${localPort}`,
    trace: 'retain-on-failure',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: liveURL
    ? undefined
    : {
        command: `node e2e/serve.mjs`,
        url: `http://localhost:${localPort}`,
        env: { PORT: String(localPort) },
        reuseExistingServer: !isCI,
      },
});
