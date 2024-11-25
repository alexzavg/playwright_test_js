import { expect } from '@playwright/test'
import { test, step } from '../../../utils/envName'

test.describe('Parabank New User Sign Up', () => {

  test.beforeEach(async ({pageManager}) => {
    await pageManager.mainPage.openMainPage()
  })

  test('New User Sign Up', async ({pageManager}) => {
    await step('navigates to sign up form', async () => {
      await pageManager.mainPage.clickRegisterLink()
      await pageManager.mainPage.waitForSignUpHeader()
    })

    await step('this step fails', async () => {
      expect(true).toBe(false)
    })
  })

})
