import { test, expect } from "../fixtures/pages.fixture";

test("Login page basic flow", async ({ loginPage }) => {
  await loginPage.goto();
});

test("Logo is visible", async ({ loginPage }) => {
  await loginPage.goto();

  await expect(loginPage.logo).toBeVisible();
  await expect(loginPage.logo).toHaveAttribute("alt", "Agile Actors Logo");
});

test("Login title", async ({ loginPage, page }) => {
  await loginPage.goto();

  await expect(page).toHaveTitle("Agile Actors' Testing Playground");
});

test("Login Form", async ({ loginPage }) => {
  await loginPage.goto();

  await expect(loginPage.loginForm).toBeVisible();
});

test("Login Button Text", async ({ loginPage }) => {
  await loginPage.goto();

  await expect(loginPage.loginButton).toBeVisible();
  await expect(loginPage.loginButton).toHaveText("Sign in");
});

test("About link redirects to Agile Actors", async ({ loginPage, page }) => {
  await loginPage.goto();

  const [newPage] = await Promise.all([
    page.waitForEvent("popup"),
    loginPage.aboutLink.click(),
  ]);

  await newPage.waitForLoadState();
  await expect(newPage).toHaveURL("https://www.agileactors.com/");
});

test("User can sign in", async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.login("test@test.com", "test");

  await expect(loginPage.dashboardTitle).toBeVisible();
});

test("User cannot sign in with wrong email", async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.login("test@gmail.com", "test");

  await expect(loginPage.error).toBeVisible();
});

test("User cannot sign in with wrong password", async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.login("test@test.com", "test123");

  await expect(loginPage.error).toBeVisible();
});

test("User cannot sign in with empty email field", async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.login(" ", "test");

  await expect(loginPage.dashboardTitle).not.toBeVisible();
});

test("User cannot sign in with empty password field", async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.login("test@test.com", " ");

  await expect(loginPage.dashboardTitle).not.toBeVisible();
});

test("User cannot sign in with empty fields", async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.login(" ", " ");

  await expect(loginPage.dashboardTitle).not.toBeVisible();
});
