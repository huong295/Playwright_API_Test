import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/api',
  
  /* Maximum time one test can run for */
  timeout: 30 * 1000,
  
  /* Reporter to use */
  reporter: [
    ['html'],
    ['list'],

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