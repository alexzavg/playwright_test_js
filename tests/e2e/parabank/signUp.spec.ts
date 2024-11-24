import { expect } from '@playwright/test'
import { test, step } from '../../../utils/envName'

test.describe('Parabank New User Sign Up', () => {

  test('New User Sign Up', async ({ pageManager }) => {
    const mainPage = pageManager.mainPage

    await step('navigates to sign up form', async () => {
      await mainPage.openMainPage()
      await mainPage.clickRegisterLink()
      await mainPage.waitForSignUpHeader()
    })

    await step('this step fails', async () => {
      expect(true).toBe(false)
    })
  })

})
