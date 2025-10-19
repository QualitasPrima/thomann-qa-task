import { Page, expect } from "@playwright/test";
import { CONFIG } from "../utils/config";
import { getRandomItem } from "../utils/randomTestUtils";
import { logStep } from "../utils/logger";
import { clickIfVisible, getText } from "../helpers/uiHelpers";

export class CableGuyPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  selectors = {
    cookieAccept: ".js-accept-all-cookies",
    cableBeginBtn: ".cg-plugButton--left",
    cableEndBtn: ".cg-plugButton--right",
    plugName: (name: string) => `.cg-plugItem__subheadline:text("${name}")`,
    manufacturerByAlt: (alt: string) => `.cg-brands__item img[alt="${alt}"]`,
    resultCount: ".cg-count",
    productEntries: "#cg-results .fx-product-list-entry",
    productTitle: ".product__title",
    productPrice: ".product__price-primary",
  };

  async goto() {
    logStep("CableGuyPage", "Navigate to CableGuy page...");
    await this.page.goto(`${CONFIG.BASE_URL}/cableguy.html`, {
      waitUntil: "domcontentloaded",
    });
    await clickIfVisible(this.page.locator(this.selectors.cookieAccept));
    await expect(this.page.locator(this.selectors.cableBeginBtn)).toBeVisible();
    logStep("CableGuyPage", "CableGuyPage Succesfully loads");
  }

  async selectCable(begin: string, end: string) {
    logStep("CableGuyPage", `Select random plug combo: ${begin} → ${end}`);
    await this.page.click(this.selectors.cableBeginBtn);
    await this.page.click(this.selectors.plugName(begin));
    await this.page.click(this.selectors.cableEndBtn);
    await this.page.click(this.selectors.plugName(end));
  }

  async selectManufacturer(name: string) {
    logStep("CableGuyPage", `Select random manufacturer: ${name}`);
    await this.page.click(this.selectors.manufacturerByAlt(name));
    await expect(this.page.locator(this.selectors.resultCount)).toContainText(
      name
    );
  }

  async SelectProduct() {
    const products = await this.page
      .locator(this.selectors.productEntries)
      .all();
    expect(products.length).toBeGreaterThan(0);

    const chosen = getRandomItem(products);
    const title = await getText(chosen.locator(this.selectors.productTitle));
    const price = await getText(chosen.locator(this.selectors.productPrice));

    logStep("CableGuyPage", `Click on product: ${title} (${price})`);

    await chosen.locator("a.product__content").click();
    return { title, price };
  }
}
