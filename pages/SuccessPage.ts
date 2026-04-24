import { expect, Locator, Page } from "@playwright/test";

export class SuccessPage {
  readonly page: Page;
  readonly returnButton: Locator;
  readonly successTitle: Locator;
  readonly successOrderId: Locator;

  constructor(page: Page) {
    this.page = page;
    this.returnButton = page.locator('[data-test-id="success-return-button"]');
    this.successTitle = page.locator('[data-test-id="success-title"]');
    this.successOrderId = page.locator('[data-test-id="success-order-id"]');
  }

  async returnToProducts() {
    await this.returnButton.click();
  }

  async expectSuccessTitle() {
    await expect(this.successTitle).toHaveText("Thank You For Your Order!");
  }

  async expectSingleOrderId() {
    await expect(this.successOrderId).toHaveCount(1);
  }
}
