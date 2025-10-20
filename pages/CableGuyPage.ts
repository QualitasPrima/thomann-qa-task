import { Page, expect } from "@playwright/test";
import { CONFIG } from "../utils/config";
import { getRandomItem } from "../utils/randomTestUtils";
import { logStep } from "../utils/logger";
import { cookiesBanner, getText } from "../helpers/uiHelpers";

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
    cableFound: ".cg-count",
    productEntries: ".fx-product-list-entry",
    productTitle: ".product__title",
    productPrice: ".product__price-primary",
  };

  /** ✅ Navigate to CableGuy builder page */
  async goto() {
    logStep("CableGuyPage", "Navigate to CableGuy page...");
    await this.page.goto(`${CONFIG.BASE_URL}/cableguy.html`, {
      waitUntil: "domcontentloaded",
    });

    // Handle cookie banner if visible
    await cookiesBanner(this.page.locator(this.selectors.cookieAccept));
    await expect(this.page.locator(this.selectors.cableBeginBtn)).toBeVisible();

    logStep("CableGuyPage", "CableGuyPage Succesfully loads");
  }

  /** ✅ Select plug combination (beginning → end) */
  async selectCableAtRandom(begin: string, end: string) {
    logStep("CableGuyPage", `Select plug combo at random: ${begin} → ${end}`);
    await this.page.click(this.selectors.cableBeginBtn);
    await this.page.click(this.selectors.plugName(begin));
    await this.page.click(this.selectors.cableEndBtn);
    await this.page.click(this.selectors.plugName(end));
  }

  /** ✅ Select manufacturer and validate counts (headline vs actual results) */
  async selectManufacturerAtRandom(name: string) {
    logStep("CableGuyPage", `Selecting manufacturer: ${name}`);

    // Click the manufacturer logo
    const logo = this.page.locator(this.selectors.manufacturerByAlt(name));
    await expect(logo).toBeVisible({ timeout: CONFIG.TIMEOUT.long });
    await logo.click();

    // Wait until the “X cables found” headline updates
    const cablesFound = this.page.locator(".cg-count");
    await expect(cablesFound).toContainText(name, {
      timeout: CONFIG.TIMEOUT.long,
    });

    // Wait for product list to appear
    await this.page.waitForSelector(".fx-product-list-entry", {
      timeout: CONFIG.TIMEOUT.long,
    });

    const products = this.page.locator(".fx-product-list-entry");

    // --- Extract counts ---
    const headlineText = (await cablesFound.textContent()) || "";
    const headlineCount = parseInt(headlineText.replace(/\D/g, ""), 10) || 0;
    const actualCount = await products.count();

    // --- Log and assert ---
    logStep(
      "CableGuyPage",
      `🎧 ${name} | Cable found count: ${headlineCount} | Products rendered: ${actualCount}`
    );

    expect(actualCount).toBeGreaterThan(0);
    expect(actualCount).toBe(headlineCount);

    logStep(
      "CableGuyPage",
      `✅ Verified: ${actualCount} ${name} items displayed correctly.`
    );
  }

  /** ✅ Randomly pick one product from results and open its detail page */
  async selectProductAtRandom() {
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
