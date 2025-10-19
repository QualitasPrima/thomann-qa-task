import { Page, Locator, expect } from "@playwright/test";
import { CONFIG } from "../utils/config";
import { logStep } from "../utils/logger";

// ✅ Click only if visible
export async function clickIfVisible(
  locator: Locator,
  timeout = CONFIG.TIMEOUT.short
) {
  if (await locator.isVisible({ timeout })) {
    await locator.click();
    logStep("UI", "Clicked visible element");
    return true;
  }
  return false;
}

// ✅ Get clean text
export async function getText(locator: Locator, fallback = "N/A") {
  try {
    return ((await locator.textContent()) || "").trim() || fallback;
  } catch {
    return fallback;
  }
}

// ✅ Wait for navigation
export async function waitForNavigation(page: Page, pattern: RegExp) {
  await page.waitForURL(pattern, { timeout: CONFIG.TIMEOUT.long });
  logStep("UI", `Navigation matched ${pattern}`);
}

// ✅ Simple text assert
export async function expectNormalizedText(locator: Locator, expected: string) {
  const text = ((await locator.textContent()) || "").toLowerCase().trim();
  expect(text).toContain(expected.toLowerCase().trim());
}
