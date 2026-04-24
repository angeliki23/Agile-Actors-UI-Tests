import { expect, Locator, Page } from "@playwright/test";

export class ProductsPage {
  readonly page: Page;
  readonly cartButton: Locator;
  readonly cartCount: Locator;
  readonly productDescription: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartButton = page.locator('[data-test-id="cart-button"]');
    this.cartCount = page.locator('[data-test-id="cart-count"]');
    this.productDescription = page.locator('[data-test-id="modal-product-description"]');
  }

  productCard(id: number): Locator {
    return this.page.locator(`[data-test-id="product-card-${id}"]`);
  }

  async addToCart(id: number) {
    await this.productCard(id)
      .locator('[data-test-id="add-to-cart-button"]')
      .click();
  }

  async addMultiple(id: number, count: number) {
    await this.productCard(id)
      .locator('[data-test-id="add-to-cart-button"]')
      .click({ clickCount: count });
  }

  async viewDetails(id: number) {
    await this.productCard(id)
      .locator('[data-test-id="view-details-button"]')
      .click();
  }

  async openCart() {
    await this.cartButton.click();
  }

  async expectCartCount(count: number) {
    await expect(this.cartCount).toHaveText(String(count));
  }

  async expectProductDescription(text: string) {
    await expect(this.productDescription).toHaveText(text);
  }
}
