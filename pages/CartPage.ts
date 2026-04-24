import { expect, Locator, Page } from "@playwright/test";

export class CartPage {
  readonly page: Page;
  readonly checkoutButton: Locator;
  readonly emptyCartMessage: Locator;
  readonly totalAmount: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutButton = page.locator('[data-test-id="checkout-button"]');
    this.emptyCartMessage = page.locator('[data-test-id="empty-cart-message"]');
    this.totalAmount = page.locator('[data-test-id="cart-total-amount"]');
  }

  cartItem(id: number): Locator {
    return this.page.locator(`[data-test-id="cart-item-${id}"]`);
  }

  removeButton(id: number): Locator {
    return this.page.locator(`[data-test-id="remove-item-${id}"]`);
  }

  async checkout() {
    await this.checkoutButton.click();
  }

  async removeItem(id: number) {
    await this.removeButton(id).click();
  }

  async expectCheckoutDisabled() {
    await expect(this.checkoutButton).toBeDisabled();
  }

  async expectTotalAmount(amount: string) {
    await expect(this.totalAmount).toHaveText(amount);
  }

  async expectItemRemoved(id: number) {
    await expect(this.cartItem(id)).toHaveCount(0);
  }

  async expectEmptyCartMessage() {
    await expect(this.emptyCartMessage).toHaveText("Your cart is empty");
  }
}
