import { defineConfig, devices } from '@playwright/test';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  /* Set folder containing tests */
  testDir: './tests',

  /* Reporter config */
  reporter: [['html', { open: 'on-failure' }]],

  /* Maximum time one test can run for. Default is 30 sec (30 * 1000) */
  timeout: 30 * 1000, // example for 2 min: timeout: 2 * 60 * 1000,

  /* Maximum time to wait for a locator. Default is 5 sec (5 * 1000) */
  expect: { timeout: 5 * 1000 },

  /* Run all tests in parallel */
  // fullyParallel: true,

  /* Set number of parallel workers */
  // workers: 2,

  /* Fail the build on CI if you accidentally left test.only in the source code. */
  // forbidOnly: !!process.env.CI,

  /* Retry on CI only */
  // retries: process.env.CI ? 2 : 0,

  /* Opt out of parallel tests on CI. */
  // workers: process.env.CI ? 1 : undefined,

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Sets base URL to use in actions like `await page.goto('/')` by picking it baseed on User input */
    // baseURL: 'https://st2016.inv.bg/',

    /* Browser Mode */
    headless: true,

    /* Browser height and width */
    viewport: { width: 1500, height: 730 },

    // ignoreHTTPSErrors: true,

    /* Enable File Downloads in Chrome */
    // acceptDownloads: true,

    /* Add report Artifacts */
    // screenshot: `only-on-failure`,
    video: `retain-on-failure`,
    // trace: `retain-on-failure`, // causes issues in parallel execution sometimes

    /* Activates slow motion exectution in headed mode */
    launchOptions: {
      slowMo: 500,
    },
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'Microsoft Edge',
      use: {
        /* Configure the base browser to use. */
        ...devices['Desktop Edge'],
      },
    },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },

    /* Test against other browsers. */
    // {
    //   name: 'chromium',
    //   use: { ...devices['Desktop Chrome'] },
    // },
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    //   dependencies: ['setup'],
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
