import { test, expect } from "@playwright/test";

const cableBuilderUrl = "https://www.thomann.de/intl/cableguy.html";
const productName = "Sennheiser GA3030-AM";
const manufacturerResultText = "2 cables of Sennheiser found";
const toastMessage = `Item ${productName} is now in the shopping basket.`;

test.describe("Cable purchase flow", () => {
  test("selects a Sennheiser cable and adds it to the basket", async ({
    page,
  }) => {
    await test.step("Navigate and open cableguy page", async () => {
      await page.goto(cableBuilderUrl);
    });

    await test.step("Accept cookies if prompted", async () => {
      const acceptCookiesButton = page.getByRole("button", {
        name: /alright!/i,
      });
      if (await acceptCookiesButton.isVisible()) {
        await acceptCookiesButton.click();
      }
    });

    await test.step("Selecting cable ends", async () => {
      await page.getByRole("button", { name: /cable beginning/i }).click();
      await page
        .locator("div:nth-child(2) > .cg-plugItem__wrapper > .cg-plugImage")
        .first()
        .click();

      await page.getByRole("button", { name: /cable end/i }).click();
      await page
        .locator(".cg-plugItem__wrapper > .cg-plugImage")
        .first()
        .click();
    });

    await test.step("Filter results by manufacturer and validate counts", async () => {
      await page.getByRole("img", { name: /sennheiser/i }).click();

      await expect(page.locator("#cableguy")).toContainText(
        manufacturerResultText
      );
      await expect(page.locator("#cg-results")).toBeVisible();
    });

    await test.step("Open the product details page", async () => {
      await page.getByRole("link", { name: `${productName} 1` }).click();
      await expect(page.locator("h1")).toContainText(productName);
    });

    await test.step("Add the product to the basket and confirm toast", async () => {
      await page.getByRole("button", { name: /add to basket/i }).click();
      await expect(
        page.getByText(toastMessage, { exact: false })
      ).toBeVisible();
    });

    await test.step("Verify product is present in the basket", async () => {
      const basketProductLink = page.getByRole("link", {
        name: productName,
        exact: true,
      });
      await expect(basketProductLink).toBeVisible();
      await basketProductLink.click();
    });
  });
});
