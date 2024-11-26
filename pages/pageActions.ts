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
    attribute: string,
    expectedValue: string,
    timeout: number = 10000
  ) {
    await step(`Wait for element '${locator}' to have attribute '${attribute}' with value: '${expectedValue}'`, async () => {
      const startTime = Date.now()
  
      while (true) {
        const attributeValue = await locator.getAttribute(attribute)
  
        if (attributeValue?.trim() === expectedValue) {
          return
        }
  
        if (Date.now() - startTime > timeout) {
          throw new Error(
            `Timeout exceeded while waiting for element '${locator}' to have attribute '${attribute}' with value '${expectedValue}'. Actual value: '${attributeValue}'`
          )
        }
  
        await new Promise(resolve => setTimeout(resolve, 1000))
      }
    })
  }
  

  async checkElementText(locator: Locator, text: string) {
    await step(`checks text inside the element: '${locator}'`, async () => {
      const textValue = await locator.textContent()
      await expect(textValue).toEqual(text)
    })
  }

  async waitForElementText(locator: Locator, expectedText: string, timeout: number = 30000) {
    await step(`Wait for element '${locator}' to have text: '${expectedText}'`, async () => {
      const startTime = Date.now()
  
      while (true) {
        const textValue = await locator.textContent()
  
        if (textValue?.trim() === expectedText) {
          return
        }
  
        if (Date.now() - startTime > timeout) {
          throw new Error(
            `Timeout exceeded while waiting for element '${locator}' to have text '${expectedText}'. Actual text: '${textValue}'`
          )
        }
  
        await new Promise(resolve => setTimeout(resolve, 1000))
      }
    })
  }

  async getElementText(locator: Locator) {
    let text
    await step(`gets text from element: '${locator}'`, async () => {
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