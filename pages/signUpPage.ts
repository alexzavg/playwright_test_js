import { Page, Locator } from '@playwright/test'
import { PageActions } from './pageActions'

interface UserData {
  firstName: string
  lastName: string
  street: string
  city: string
  state: string
  zip: string
  phone: string
  ssn: string
  userName: string
  password: string
}

export class SignUpPage extends PageActions {
  firstNameInput: Locator
  lastNameInput: Locator
  streetInput: Locator
  cityInput: Locator
  stateInput: Locator
  zipInput: Locator
  phoneInput: Locator
  ssnInput: Locator
  userNameInput: Locator
  passwordInput: Locator
  confirmPasswordInput: Locator
  registerBtn: Locator
  accountCreatedSuccessMsg: Locator

  constructor(page: Page) {
    super(page)
    this.firstNameInput = page.locator('[name="customer.firstName"]')
    this.lastNameInput = page.locator('[name="customer.lastName"]')
    this.streetInput = page.locator('[name="customer.address.street"]')
    this.cityInput = page.locator('[name="customer.address.city"]')
    this.stateInput = page.locator('[name="customer.address.state"]')
    this.zipInput = page.locator('[name="customer.address.zipCode"]')
    this.phoneInput = page.locator('[name="customer.phoneNumber"]')
    this.ssnInput = page.locator('[name="customer.ssn"]')
    this.userNameInput = page.locator('[name="customer.username"]')
    this.passwordInput = page.locator('[name="customer.password"]')
    this.confirmPasswordInput = page.locator('[name="repeatedPassword"]')
    this.registerBtn = page.locator('[value="Register"]')
    this.accountCreatedSuccessMsg = page.locator('p:has-text("Your account was created successfully. You are now logged in.")')
  }

  async newUserSignUp(userData: UserData) {
    const {
      firstName,
      lastName,
      street,
      city,
      state,
      zip,
      phone,
      ssn,
      userName,
      password
    } = userData
  
    await this.fillElement(this.firstNameInput, firstName)
    await this.fillElement(this.lastNameInput, lastName)
    await this.fillElement(this.streetInput, street)
    await this.fillElement(this.cityInput, city)
    await this.fillElement(this.stateInput, state)
    await this.fillElement(this.zipInput, zip)
    await this.fillElement(this.phoneInput, phone)
    await this.fillElement(this.ssnInput, ssn)
    await this.fillElement(this.userNameInput, userName)
    await this.fillElement(this.passwordInput, password)
    await this.fillElement(this.confirmPasswordInput, password)
    await this.clickElement(this.registerBtn)
    await this.waitForElement(this.accountCreatedSuccessMsg)
  }  

}
