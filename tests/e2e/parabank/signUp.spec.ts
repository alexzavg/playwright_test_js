import { expect } from '@playwright/test'
import { test, step } from '../../../utils/envName'

test.describe('Parabank New User Sign Up', () => {

  test.beforeEach(async ({pageManager}) => {
    await pageManager.mainPage.openMainPage()
  })

  test('New User Sign Up', async ({pageManager}) => {
    const userData = {
      firstName: 'John',
      lastName: 'Doe',
      street: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      zip: '12345',
      phone: '123-456-7890',
      ssn: '123-45-6789',
      userName: `johndoe${Date.now()}`,
      password: 'password123'
    }

    await step('navigates to sign up form', async () => {
      await pageManager.mainPage.clickRegisterLink()
      await pageManager.mainPage.waitForSignUpHeader()
    })

    await step('signs up with new user data', async () => {
      await pageManager.signUpPage.newUserSignUp(userData)
    })

    await step('fails on purpose', async () => {
      expect(true).toBe(false)
    })
  })

})
