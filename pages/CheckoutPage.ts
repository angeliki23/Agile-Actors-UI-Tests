import { expect, Locator, Page } from "@playwright/test";

export class CheckoutPage {
  readonly page: Page;
  readonly nameInput: Locator;
  readonly addressInput: Locator;
  readonly zipInput: Locator;
  readonly cityInput: Locator;
  readonly phoneInput: Locator;

  readonly placeOrderButton: Locator;
  readonly confirmButton: Locator;
  readonly cancelCheckoutButton: Locator;
  readonly confirmCancelButton: Locator;

  readonly nameError: Locator;
  readonly addressError: Locator;
  readonly zipError: Locator;
  readonly cityError: Locator;
  readonly phoneError: Locator;

  constructor(page: Page) {
    this.page = page;

    this.nameInput = page.locator('[data-test-id="name-input"]');
    this.addressInput = page.locator('[data-test-id="address-input"]');
    this.zipInput = page.locator('[data-test-id="zip-input"]');
    this.cityInput = page.locator('[data-test-id="city-input"]');
    this.phoneInput = page.locator('[data-test-id="phone-input"]');

    this.placeOrderButton = page.locator('[data-test-id="place-order-button"]');
    this.confirmButton = page.locator('[data-test-id="modal-confirm-button"]');
    this.cancelCheckoutButton = page.locator('[data-test-id="cancel-checkout-button"]');
    this.confirmCancelButton = page.locator('[data-test-id="modal-confirm-cancel-button"]');

    this.nameError = page.locator('[data-test-id="name-error"]');
    this.addressError = page.locator('[data-test-id="address-error"]');
    this.zipError = page.locator('[data-test-id="zip-error"]');
    this.cityError = page.locator('[data-test-id="city-error"]');
    this.phoneError = page.locator('[data-test-id="phone-error"]');
  }

  async fillForm(
    name: string,
    address: string,
    zip: string,
    city: string,
    phone: string
  ) {
    await this.nameInput.fill(name);
    await this.addressInput.fill(address);
    await this.zipInput.fill(zip);
    await this.cityInput.fill(city);
    await this.phoneInput.fill(phone);
  }

  async placeOrder() {
    await this.placeOrderButton.click();
  }

  async confirmOrder() {
    await this.confirmButton.click();
  }

  async doubleClickConfirmOrder() {
    await this.confirmButton.click({ clickCount: 2 });
  }

  async cancelCheckout() {
    await this.cancelCheckoutButton.click();
  }

  async confirmCancelCheckout() {
    await this.confirmCancelButton.click();
  }

  async expectEmptyFieldsErrors() {
    await expect(this.nameError).toHaveText("Name is required");
    await expect(this.addressError).toHaveText("Address is required");
    await expect(this.zipError).toHaveText("Please enter a valid 5-digit ZIP code");
    await expect(this.cityError).toHaveText("City is required");
    await expect(this.phoneError).toHaveText("Please enter a valid phone number");
  }

  async expectInvalidDataErrors() {
    await expect(this.zipError).toHaveText("Please enter a valid 5-digit ZIP code");
    await expect(this.phoneError).toHaveText("Please enter a valid phone number");
  }
}
