import { test } from "@playwright/test";
import { CableGuyPage } from "../pages/CableGuyPage";
import { ProductPage } from "../pages/ProductPage";
import { BasketPage } from "../pages/BasketPage";
import { logSuccess } from "../utils/logger";
import { getRandomCableCombo } from "../helpers/dataHelper";

test.describe("Thomann CableGuy E2E Flow", () => {
  test("CableGuy → Product → Basket (end-to-end)", async ({ page }) => {
    const cableGuy = new CableGuyPage(page);
    const productPage = new ProductPage(page);
    const basket = new BasketPage(page);

    // --- Randomize test data via helper ---
    const { beginning, end, brand, comboName } = getRandomCableCombo();

    console.log(
      `🎯 Combo: ${comboName} | ${beginning} → ${end} | Brand: ${brand}`
    );

    // === STEP 1: CableGuy flow ===
    await cableGuy.goto();
    await cableGuy.selectCableAtRandom(beginning, end);
    await cableGuy.selectManufacturerAtRandom(brand);

    const { title } = await cableGuy.selectProductAtRandom();

    // === STEP 2: Product page ===
    await productPage.verifyLoaded(title);
    await productPage.verifyPriceAndQuantity();
    await productPage.addToBasket();

    // 🕒 Wait before checking basket
    await page.waitForTimeout(1000);

    // === STEP 3: Basket page ===
    await basket.verifyLoaded();
    await basket.verifyToast(title);
    await basket.verifyBasketDetails(title);

    logSuccess("✅ Full journey validated successfully!");
  });
});
