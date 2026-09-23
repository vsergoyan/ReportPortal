import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config({
  path: `.env.${process.env.TEST_ENV || 'local'}`
});
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './src/tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    [
      '@reportportal/agent-js-playwright',
      {
        endpoint: process.env.RP_ENDPOINT,
        project: process.env.RP_PROJECT,
        apiKey: process.env.RP_API_KEY,
        launch: `Playwright (${process.env.TEST_ENV || 'local'})`,
        attributes: [
          {
            key: 'framework',
            value: 'playwright'
          }
        ]
      }
    ],
    [
      'junit',
      {
          outputFile: 'test-results/junit.xml',
      },
    ],
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    baseURL: process.env.BASE_URL,
    headless: process.env.HEADLESS === 'true',
    trace: 'on-first-retry',
  },

  projects: [
    // API tests
    {
        name: 'api',
        testMatch: '**/api/**/*.spec.ts',
    },
    // UI tests
    {
        name: 'chromium',
        testMatch: '**/playwright/*.spec.ts',
        use: { ...devices['Desktop Chrome'] },
    },
    {
        name: 'firefox',
        testMatch: '**/playwright/*.spec.ts',
        use: { ...devices['Desktop Firefox'] },
    },
    {
        name: 'webkit',
        testMatch: '**/playwright/*.spec.ts',
        use: { ...devices['Desktop Safari'] },
    },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
