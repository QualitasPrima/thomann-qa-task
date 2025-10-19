import { Page } from "@playwright/test";

export class CableGuyPage {
  constructor(private page: Page) {}

  async navigateToCableGuy() {}
  async selectCableEnds() {}
  async selectManufacturer() {}
  async selectProduct() {
    return { title: "" };
  }
}
