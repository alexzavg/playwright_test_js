import { Locator, Page, expect } from "@playwright/test"
import { step } from '../utils/envName'

export class PageActions {

  page: Page

  constructor(page: Page) {
    this.page = page
  }

  async openUrl(url: string) {
    await step(`navigates to URL: '${url}'`, async () => {
      await this.page.goto(url)
    })
  }

  async refreshPage() {
    await step(`refreshes page`, async () => {
      await this.page.reload()
      await this.page.waitForLoadState('load')
      await this.page.waitForLoadState('domcontentloaded')
      await this.page.waitForLoadState('networkidle')
      await this.page.waitForTimeout(1000)
    })
  }

  async waitForUrl(url: string) {
    await step(`waits for page URL to be: '${url}'`, async () => {
      await this.page.waitForURL(url)
      await this.page.waitForLoadState('load')
      await this.page.waitForLoadState('domcontentloaded')
      await this.page.waitForLoadState('networkidle')
      await this.page.waitForTimeout(500)
    })
  }

  async waitForElement(locator: Locator) {
    await step(`waits until element: '${locator}' is visible`, async () => {
      await locator.waitFor()
    })
  }

  async waitForElementInvisible(locator: Locator) {
    await step(`waits until element: '${locator}' is invisible`, async () => {
      await expect(locator).not.toBeVisible()
    })
  }

  async waitForElementEnabled(locator: Locator) {
    await step(`waits until element: '${locator}' doesn't have "disabled" attribute`, async () => {
      await expect(locator).toBeEnabled()
    })
  }

  async waitForElementEditable(locator: Locator) {
    await step(`waits until element: '${locator}' doesn't have "readonly" property`, async () => {
      await expect(locator).toBeEditable()
    })
  }

  async clickElement(locator: Locator) {
    await step(`clicks element: '${locator}'`, async () => {
      await locator.click()
    })
  }

  async clickElementForce(locator: Locator) {
    await step(`force-clicks element: '${locator}'`, async () => {
      await locator.click({
        button: 'middle',
        clickCount: 10,
        delay: 250
      })
    })
  }

  async clickElementCentre(locator: Locator) {
    await step(`clicks element: '${locator}'`, async () => {
      const box = await locator.boundingBox()
      // await locator.scrollIntoViewIfNeeded()
      await this.page.mouse.click(box!.x + box!.width / 2, box!.y + box!.height / 2)
    })
  }

  async fillElement(locator: Locator, text: string) {
    await step(`fills element: '${locator}' with text: '${text}'`, async () => {
      await locator.fill(text)
    })
  }

  async pressKey(key: string) {
     await step(`presses '${key}' key`, async () => {
      await this.page.keyboard.press(key)
    })
  }

  async checkElementAttribute(locator: Locator, attr: string, value: string) {
    await step(`gets attribute: '${attr}' from element: '${locator}'`, async () => {
      const attribute = await locator.getAttribute(attr)
      await expect(attribute).toEqual(value)
    })
  }

  async waitForElementAttribute(
    locator: Locator,
    attr: string,
    value: string,
    timeout = 60000
  ) {
    await step(`waits for element '${locator}' to have attribute '${attr}' with value '${value}'`, async () => {
      const pollingInterval = 1000 // Poll every second
      const startTime = Date.now()

      while (Date.now() - startTime < timeout) {
        const currentValue = await locator.evaluate((el, attr) => el.getAttribute(attr), attr)
        if (currentValue === value) {
          const attribute = await locator.getAttribute(attr)
          expect(attribute).toBe(value)
          return // Attribute value matches, exit early
        }
        await new Promise(resolve => setTimeout(resolve, pollingInterval)) // Wait before retrying
      }

      throw new Error(
        `Timed out after ${timeout}ms waiting for element to have attribute '${attr}' with value '${value}'`
      )
    })
  }

  async checkElementText(locator: Locator, text: string) {
    await step(`checks text from element with locator: '${locator}'`, async () => {
      const textValue = await locator.textContent()
      await expect(textValue).toEqual(text)
    })
  }

  async getElementText(locator: Locator) {
    let text
    await step(`gets text from element with locator: '${locator}'`, async () => {
      text = await locator.textContent()
    })
    return text as string
  }

  async selectDropdownOption(locator: Locator, option: Locator) {
    await step(`selects option '${option}' from dropdown '${locator}'`, async () => {
      await locator.click()
      await option.click()
    })
  }

  async checkCheckbox(locator: Locator) {
    await step(`checks checkbox '${locator}'`, async () => {
      await locator.check()
      await expect(locator).toBeChecked()
    })
  }

  async isCheckboxChecked(locator: Locator) {
    await step(`checks if checkbox '${locator}' is checked`, async () => {
      await expect(locator).toBeChecked()
    })
  }

  async uncheckCheckbox(locator: Locator) {
    await step(`unchecks checkbox '${locator}'`, async () => {
      await locator.uncheck()
      await expect(locator).not.toBeChecked()
    })
  }

  async isCheckboxUnchecked(locator: Locator) {
    await step(`checks if checkbox '${locator}' is unchecked`, async () => {
      await expect(locator).not.toBeChecked()
    })
  }

  async getCookie(URL: string, cookieName: string){
    var cookie = await this.page.context().cookies(URL)
    //console.log("cookie text: " + JSON.stringify(cookie))

    var lengthCookie = cookie.length
    var valueOfCookie

    for (var step = 0; step < lengthCookie; step++) {
      if(cookie[step]['name'] === cookieName){
        valueOfCookie = cookie[step]['value']
        //console.log(`Cookie: ${cookieName}=${valueOfCookie}`)
      }
    }

    return `${cookieName}=${valueOfCookie}`
  }

  async setCookie(cookieName: string, cookieValue: string) {
    // Set the cookie
    await this.page.evaluate(({ name, value }) => {
      document.cookie = `${name}=${value}`
    }, { name: cookieName, value: cookieValue })
  
    // Check if the cookie was set
    const cookieSet = await this.page.evaluate((name) => {
      const cookies = document.cookie
      return cookies.includes(name)
    }, cookieName)
  
    // Throw an error if the cookie wasn't set
    if (!cookieSet) {
      throw new Error(`Cookie "${cookieName}" was not set.`)
    }
  }

}