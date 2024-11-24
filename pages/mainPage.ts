import { Page, Locator } from '@playwright/test'
import { PageActions } from './pageActions'

export class MainPage extends PageActions {
  baseUrl: string
  registerLink: Locator
  signUpFormHeader: Locator

  constructor(page: Page) {
    super(page)
    this.baseUrl = process.env.BASE_URL!
    this.registerLink = page.locator('[href*="register"]')
    this.signUpFormHeader = page.locator('h1:has-text("Signing up is easy!")')
  }

  async openMainPage() {
    await this.openUrl(this.baseUrl)
  }

  async clickRegisterLink() {
    await this.clickElement(this.registerLink)
  }

  async waitForSignUpHeader() {
    await this.waitForElement(this.signUpFormHeader)
  }
}
