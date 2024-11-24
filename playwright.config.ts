import { defineConfig } from '@playwright/test';
import { OrtoniReportConfig } from "ortoni-report";

const reportConfig: OrtoniReportConfig = {
  open: process.env.CI ? "never" : "on-failure",
  folderPath: `html_report`,
  filename: "index.html",
  title: "Playwright Test Report",
  showProject: false,
  projectName: "Automation Tests",
  testType: "E2E Tests",
  authorName: "Oleksandr Zavhorodnii",
  base64Image: false,
  stdIO: true,
  preferredTheme: "dark",
  port: 3600
};

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  projects: [
    {
      name: 'e2e',
      testMatch: ['/tests/e2e/**/*.spec.ts']
    },
  ],
  timeout: 1000 * 60 * 5, // 5 minutes
  expect: { 
    timeout: 120000 
  },
  globalSetup: 'utils/globalSetup.ts',
  reporter: [
    ['list'],
    //["ortoni-report", reportConfig]
    ['html', {
      outputFolder: 'html_report',
      open: 'never',
      inlineImages: true
    }],
  ],
  use: {
    actionTimeout: 120000,
    navigationTimeout: 120000,
    screenshot: 'only-on-failure',
    video: {
      mode: 'retain-on-failure',
      // size: {
      //   width: 1920,
      //   height: 1080
      // }
    },
    trace: 'retain-on-failure',
    contextOptions: {
      recordVideo: {
        dir: './test-results/videos/',
        // size: {
        //   width: 1920,
        //   height: 1080
        // }
      },
      colorScheme: 'dark',
      serviceWorkers: 'allow'
    }
  }
});
