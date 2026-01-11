import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  
  /* Maximum time one test can run for */
  timeout: 30 * 1000,
  
  /* Run tests in files in parallel */
  fullyParallel: true,
  
  /* Fail the build on CI if you accidentally left test.only in the source code */
  forbidOnly: !!process.env.CI,
  
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  
  /* Opt out of parallel tests on CI */
  workers: process.env.CI ? 1 : undefined,
  
  /* Reporter to use */
  reporter: [
    ['html'],
    ['list'],
    ['json', { outputFile: 'test-results.json' }]
  ],
 
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
  baseURL: 'https://api.thedogapi.com', 
     extraHTTPHeaders: {
      'Accept': 'application/json',
    },

    /* Collect trace when retrying the failed test */
    trace: 'on-first-retry',
    
    /* Extra HTTP headers for API requests */
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'API Tests',
      testMatch: /.*\.spec\.ts/,
    },
  ],

});