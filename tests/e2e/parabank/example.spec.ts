import { expect } from '@playwright/test'
import { test, step } from '../../../utils/envName'

test.describe('Example test suite', () => {

  test('has title', async ({ page }) => {
    await step('go to URL', async () => {
      await page.goto('https://playwright.dev/')
    })
    
    await step('check title', async () => {
      await expect(page).toHaveTitle(/Playwright/)
    })
  })
  
  test('get started link', async ({ page }) => {
    await step('go to URL', async () => {
      await page.goto('https://playwright.dev/')
    })
  
    await step('click link', async () => {
      await page.getByRole('link', { name: 'Get started' }).click()
    })
  
    await step('check heading', async () => {
      await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible()
    })
  
    await step('this step fails', async () => {
      expect(true).toBe(false)
    })
  })

})
