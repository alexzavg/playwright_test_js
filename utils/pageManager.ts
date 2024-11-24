import { Page } from '@playwright/test'
import { MainPage } from '../pages/mainPage'
import { PageActions } from '../pages/pageActions'

export class PageManager {
  page: Page
  constructor(page: Page) {
    this.page = page
  }
  get pageActions(): PageActions {
    return new PageActions(this.page)
  }
  get mainPage(): MainPage {
    return new MainPage(this.page)
  }
}
