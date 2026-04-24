import { test as base, expect } from "./pages.fixture";

type AuthFixtures = {
  loggedIn: void;
};

export const test = base.extend<AuthFixtures>({
  loggedIn: [
    async ({ loginPage }, use) => {
      await loginPage.goto();
      await loginPage.login("test@test.com", "test");
      await use();
    },
    { auto: true },
  ],
});

export { expect };