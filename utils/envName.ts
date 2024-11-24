import { test as base, Page } from '@playwright/test'
import { color } from './common'
import { PageManager } from './pageManager'

// Extend TestFixtures to include custom fixtures
type TestFixtures = {
  saveLogs: void // Custom saveLogs fixture
  pageManager: PageManager // PageManager fixture
}

// Custom test with extended fixtures
export const test = base.extend<TestFixtures>({
  // Custom fixture for logging environment variables
  saveLogs: [
    async ({}, use) => {
      console.log(color.info(`<<< ENVIRONMENT: ${process.env.ENV_NAME} >>>`))
      console.log(color.info(`Working directory: ${process.cwd()}`))
      await use()
    },
    { auto: true },
  ],

  // Custom fixture for the PageManager
  pageManager: async ({ page }, use) => {
    const pageManager = new PageManager(page) // Initialize PageManager
    await use(pageManager) // Provide it in the test context
  },
})

// Step function for enhanced logging
export const step = async (name: string, callback: () => Promise<void>): Promise<void> => {
  try {
    await test.step(name, callback)
    console.log(color.success(`Test step [${name}] passed`))
  } catch (error) {
    if (error instanceof Error) {
      console.log(color.error(`Test step [${name}] failed: ${error.message}`))
    } else {
      console.log(color.error(`Test step [${name}] failed: ${error}`))
    }
    throw new Error(`Test step [${name}] failed`)
  }
}
