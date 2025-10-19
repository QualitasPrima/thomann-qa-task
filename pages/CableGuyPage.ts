import { expect, Page } from "@playwright/test";

export class CableGuyPage {
  readonly page: Page;

  // Inline base URL (we'll refactor to utils/config later)
  private BASE_URL = "https://www.thomann.de/intl";

  // Minimal selectors (we'll expand later)
  private selectors = {
    cookieAccept: ".js-accept-all-cookies",
    cableBeginBtn: ".cg-plugButton--left",
    cableEndBtn: ".cg-plugButton--right",
    plugName: (name: string) => `.cg-plugItem__subheadline:text("${name}")`,
  };

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto(`${this.BASE_URL}/cableguy.html`, {
      waitUntil: "domcontentloaded",
    });

    const btn = this.page.locator(this.selectors.cookieAccept);
    if (await btn.isVisible().catch(() => false)) {
      await btn.click();
    }
    await expect(this.page).toHaveURL(/cableguy\.html/);
  }

  async selectCable(begin: string, end: string) {
    // Beginning
    await this.page.locator(this.selectors.cableBeginBtn).click();
    const beginCard = this.page.locator(this.selectors.plugName(begin)).first();
    await beginCard.waitFor({ state: "visible", timeout: 20000 });
    await beginCard.locator("..").locator(".cg-plugImage").click();

    // End
    await this.page.locator(this.selectors.cableEndBtn).click();
    const endCard = this.page.locator(this.selectors.plugName(end)).first();
    await endCard.waitFor({ state: "visible", timeout: 20000 });
    await endCard.locator("..").locator(".cg-plugImage").click();
  }
}
