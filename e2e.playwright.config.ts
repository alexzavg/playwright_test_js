import { PlaywrightTestConfig } from '@playwright/test';
import base from './playwright.config';

// * variable value is taken from package.json command "test_env" argument
const env = process.env.test_env;
let globTimeout
if(env == 'stage'){
  globTimeout = 1000 * 60 * 5
}
if(env == 'prod'){
  globTimeout = 1000 * 60 * 5
}

const config: PlaywrightTestConfig = {
  ...base,
  fullyParallel: false,
  timeout: globTimeout,
  workers: 1,
  retries: 0,
  use: {
    ...base.use,
    headless: true,
    viewport: null,
    ignoreHTTPSErrors: true,
    launchOptions: {
      slowMo: 250,
      channel: 'chrome',
      args: [
        '--start-maximized',
        '--disable-extensions',
        '--incognito',
        '--test-type=browser',
        '--disable-dev-shm-usage'
      ]
    }
  },
};
export default config;