import { expect, Locator, Page } from "@playwright/test";

export class HeaderPage {
  readonly page: Page;
  readonly logoutButton: Locator;
  readonly homeButton: Locator;
  readonly loginForm: Locator;
  readonly loginTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logoutButton = page.locator('[data-test-id="logout-button"]');
    this.homeButton = page.locator('[data-test-id="footer-home-link"]');
    this.loginForm = page.locator('[data-test-id="login-form"]');
    this.loginTitle = page.locator('[data-test-id="login-title"]');
  }

  async logout() {
    await this.logoutButton.click();
  }

  async home() {
    await this.homeButton.click();
  }

  async expectLoggedOut() {
    await expect(this.loginForm).toBeVisible();
  }

  async expectHomeRedirected() {
    await expect(this.loginTitle).toBeVisible();
  }
}
