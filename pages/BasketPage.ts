import { Page } from "@playwright/test";

export class BasketPage {
  constructor(private page: Page) {}

  async verifyPage() {}
  async verifyToastNotification() {}
  async verifyProductInBasket() {}
}
