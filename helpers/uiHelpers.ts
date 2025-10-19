import { Page, Locator, expect } from "@playwright/test";
import { CONFIG } from "../utils/config";
import { logStep } from "../utils/logger";

// ✅ Click cookie/banner if visible
export async function clickIfVisible(
  locator: Locator,
  timeout = CONFIG.TIMEOUT.short
): Promise<boolean> {
  try {
    if (await locator.isVisible({ timeout })) {
      await locator.click();
      logStep("UI", "✅ Cookie/banner element detected and clicked.");
      return true;
    } else {
      logStep("UI", "ℹ️ No cookie/banner element found — skipping.");
    }
  } catch {
    logStep(
      "UI",
      "⚠️ Element not clickable or already gone — continuing test."
    );
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
