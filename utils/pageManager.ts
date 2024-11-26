import { Page } from '@playwright/test'
import { APIRequest } from '../apis/apiTemplate'
import { MainPage } from '../pages/mainPage'
import { SignUpPage } from '../pages/signUpPage'
import { PageActions } from '../pages/pageActions'

export class PageManager {
  page: Page
  constructor(page: Page) {
    this.page = page
  }
  get apiRequest(): APIRequest {
    return new APIRequest()
  }
  get pageActions(): PageActions {
    return new PageActions(this.page)
  }
  get mainPage(): MainPage {
    return new MainPage(this.page)
  }
  get signUpPage(): SignUpPage {
    return new SignUpPage(this.page)
  }
}
