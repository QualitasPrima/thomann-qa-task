import { expect, Page } from "@playwright/test";
import { CONFIG } from "../utils/config";
import { logStep } from "../utils/logger";

export class CableGuyPage {
  readonly page: Page;

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
    logStep("CableGuy", "Navigating to CableGuy page...");
    await this.page.goto(`${CONFIG.BASE_URL}/cableguy.html`, {
      waitUntil: "domcontentloaded",
    });

    const cookie = this.page.locator(this.selectors.cookieAccept);
    if (await cookie.isVisible().catch(() => false)) {
      await cookie.click();
      logStep("CableGuy", "Accepted cookies.");
    }

    await expect(this.page).toHaveURL(/cableguy\.html/);
  }

  async selectCable(begin: string, end: string) {
    logStep("CableGuy", `Selecting cable beginning: ${begin}`);
    await this.page.locator(this.selectors.cableBeginBtn).click();
    const beginPlug = this.page.locator(this.selectors.plugName(begin)).first();
    await beginPlug.waitFor({ state: "visible", timeout: CONFIG.TIMEOUT.long });
    await beginPlug.locator("..").locator(".cg-plugImage").click();

    logStep("CableGuy", `Selecting cable end: ${end}`);
    await this.page.locator(this.selectors.cableEndBtn).click();
    const endPlug = this.page.locator(this.selectors.plugName(end)).first();
    await endPlug.waitFor({ state: "visible", timeout: CONFIG.TIMEOUT.long });
    await endPlug.locator("..").locator(".cg-plugImage").click();
  }
}
