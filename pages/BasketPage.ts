import { Page, expect } from "@playwright/test";
import { CONFIG } from "../utils/config";
import { logStep } from "../utils/logger";
import { getText } from "../helpers/uiHelpers";

export class BasketPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  selectors = {
    header: "h1.basket-header",
    toast: ".fx-infobox__content.fx-text.fx-notification__content",
    itemHeadline: ".content__details .headline",
    quantity: ".fx-input-quantity__label",
    price: ".basket-entry.article-basket-entry .prices__primary",
    shipping: ".shipping-costs__prices .prices__primary",
    total: ".basket-sum__price",
  };

  /**
   * ✅ Ensure basket page loaded
   */
  async verifyLoaded() {
    logStep("Basketpage", "Waiting for basket page to load...");
    await this.page.waitForURL(/basket\.html/, {
      timeout: CONFIG.TIMEOUT.long,
    });
    await expect(this.page.locator(this.selectors.header)).toContainText(
      /your shopping basket/i,
      { timeout: CONFIG.TIMEOUT.long }
    );
    logStep("Basketpage", "✅ Basket page loaded.");
  }

  /**
   * ✅ Verify toast notification
   */
  async verifyToast(productName: string) {
    logStep("BasketPage", "Checking toast notification...");

    const toast = this.page.locator(this.selectors.toast);

    await toast.waitFor({ state: "visible", timeout: 8000 });
    await expect(toast).toContainText(productName, { timeout: 2000 });

    logStep("BasketPage", `✅ Toast confirmed for product: ${productName}`);
  }

  /**
   * ✅ Verify product item, price, shipping cost, and total price
   */
  async verifyBasketDetails(expectedName: string) {
    logStep("BasketPage", "Verifying basket details...");

    const name = await getText(this.page.locator(this.selectors.itemHeadline));
    const qty = await getText(this.page.locator(this.selectors.quantity));
    const price = await getText(this.page.locator(this.selectors.price));
    const shipping = await getText(this.page.locator(this.selectors.shipping));
    const total = await getText(this.page.locator(this.selectors.total));

    expect(name).toContain(expectedName);
    expect(qty).toBe("1");
    expect(total).toMatch(/[0-9]/);

    logStep(
      "BasketPage",
      `✅ Verified basket item: ${name} | Qty: ${qty} | Unit: ${price} | Ship: ${shipping} | Total: ${total}`
    );
  }
}
