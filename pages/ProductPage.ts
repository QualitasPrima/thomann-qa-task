import { Page } from "@playwright/test";

export class ProductPage {
  constructor(private page: Page) {}

  async verifyPage() {}
  async validatePriceAndQuantity() {}
  async addToBasket() {}
}
