import { Page, Locator } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly logo: Locator;
  readonly loginForm: Locator;
  readonly loginButton: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly dashboardTitle: Locator;
  readonly error: Locator;
  readonly aboutLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logo = page.locator('[data-test-id="logo-image"]');
    this.loginForm = page.locator('[data-test-id="login-form"]');
    this.loginButton = page.locator('[data-test-id="login-button"]');
    this.emailInput = page.locator('[data-test-id="email-input"]');
    this.passwordInput = page.locator('[data-test-id="password-input"]');
    this.dashboardTitle = page.locator('[data-test-id="dashboard-title"]');
    this.error = page.locator('[data-test-id="login-error"]');
    this.aboutLink = page.locator('[data-test-id="footer-about-link"]');
  }

  async goto() {
    await this.page.goto("https://aatp.vercel.app/");
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
