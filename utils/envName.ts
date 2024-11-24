import { test as base } from '@playwright/test';
import { color, logger } from '../scripts/common';

// New test.step function that logs the step name before calling the original function
export const step = async (name, callback) => {
  try {
    await base.step(name, callback);
    console.log(color.success(`Test step [${name}] passed`));
  } catch (error) {
    if (error instanceof Error) {
      console.log(color.error(`Test step [${name}] failed: ${error.message}`));
    } else {
      console.log(color.error(`Test step [${name}] failed: ${error}`));
    }
    throw new Error(`Test step [${name}] failed`);
  }
};

// Logs the environment variables before each test
export const test = base.extend<{ saveLogs: void }>({
  saveLogs: [ async ({page}, use) => {
    console.log(color.info(`<<< ENVIRONMENT: ${process.env.ENV_NAME} >>>`));
    console.log(color.info(`Working directory: ${process.cwd()}`));
    //await logger(page);
    await use();
  }, { auto: true } ]
});