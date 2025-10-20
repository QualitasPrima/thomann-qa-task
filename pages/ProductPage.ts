import { Page, expect } from "@playwright/test";
import { CONFIG } from "../utils/config";
import { logStep } from "../utils/logger";

export class ProductPage {
  readonly page: Page;

  selectors = {
    title: "h1[itemprop='name']",
    price: "div.price.fx-text.fx-text--no-margin",
    quantity: ".fx-input-quantity__label",
    addToBasket: "button.call-to-action__button.fx-button.fx-button--cta",
  };

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * ✅ Ensure the product page successfully loads
   */
  async verifyLoaded(expectedTitle: string) {
    logStep("ProductPage", `Verify product page: ${expectedTitle}`);

    await expect(this.page.locator(this.selectors.title)).toContainText(
      expectedTitle,
      { timeout: CONFIG.TIMEOUT.long }
    );
    logStep("ProductPage", "✅ Product page verified.");
  }

  /**
   * ✅ Confirm price and quantity elements are visible and valid
   */
  async verifyPriceAndQuantity() {
    const priceEl = this.page.locator(this.selectors.price);
    await expect(priceEl).toBeVisible({ timeout: CONFIG.TIMEOUT.medium });

    // ✅ Extract the text, then filter to keep only digits, commas, periods, and €
    const rawPrice = ((await priceEl.innerText()) || "")
      .replace(/\s+/g, " ") // normalize whitespace
      .trim();

    const match = rawPrice.match(/[\d.,]+\s*€?/); // match price pattern
    const price = match ? match[0].trim() : "N/A";

    const qtyEl = this.page.locator(this.selectors.quantity);
    await expect(qtyEl).toHaveText("1", { timeout: CONFIG.TIMEOUT.medium });

    logStep(
      "ProductPage",
      `✅ Check Product price and uantity: ${price}, Qty: 1`
    );
  }

  /**
   * ✅ Click Add to Basket button
   */
  async addToBasket() {
    const addBtn = this.page.locator(this.selectors.addToBasket);
    await expect(addBtn).toBeVisible({ timeout: CONFIG.TIMEOUT.medium });
    await addBtn.click();
    logStep("ProductPage", "🛒 Click Add To Basket .");
  }
}
