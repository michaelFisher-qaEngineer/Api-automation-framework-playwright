// @ts-check
import { chromium, defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  use: {
    viewport: null, // disables fixed viewport → full browser size
    launchOptions: {
      args: ['--start-maximized']
    }
  }
});

const config = ({
  testDir: './tests',
  // retries: 1,
  timeout: 5000,
  expect: { //assertions timeouts:
    timeout: 5000,
  },
  reporter: 'html',
  use: {
      launchOptions: {
      // args:['--start-maximized'],
      },
    browserName: 'chromium',
    headless: false,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure'
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
        headless: false,
        screenshot: 'only-on-failure', // on, off, only-on-failure
        video: 'retain-on-failure', // on, off, retain-on-failure, on-first-retry
        trace: 'retain-on-failure', // on, off, retain-on-failure, on-first-retry
  }
    },

  //   {
  //     name: 'firefox',
  //     use: {
  //       browserName: 'firefox',
  //       headless: false,
  //       screenshot: 'only-on-failure', // on, off, only-on-failure
  //       video: 'retain-on-failure', // on, off, retain-on-failure, on-first-retry
  //       trace: 'retain-on-failure', // on, off, retain-on-failure, on-first-retry
  // }

  //   },
  //   {
  //     name: 'edge',
  //     use: {
  //       browserName: 'chromium',
  //       headless: false,
  //       screenshot: 'only-on-failure', // on, off, only-on-failure
  //       video: 'retain-on-failure', // on, off, retain-on-failure, on-first-retry
  //       trace: 'retain-on-failure', // on, off, retain-on-failure, on-first-retry
  // }

  //   },
  //   {
  //     name: 'safari',
  //     use: {
  //       browserName: 'webkit',
  //       headless: false,
  //       screenshot: 'only-on-failure', // on, off, only-on-failure
  //       video: 'retain-on-failure', // on, off, retain-on-failure, on-first-retry
  //       trace: 'retain-on-failure', // on, off, retain-on-failure, on-first-retry
  // }

    // },
  ],

});
module.exports = config
