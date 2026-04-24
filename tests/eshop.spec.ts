import { test } from "../fixtures/auth.fixture";

test("Successfull Checkout", async ({
  productsPage,
  cartPage,
  checkoutPage,
  successPage,
}) => {
  await productsPage.addToCart(5);
  await productsPage.openCart();

  await cartPage.checkout();

  await checkoutPage.fillForm(
    "Angeliki Kapogianni",
    "Athinon 11",
    "12233",
    "Athens",
    "6973215662"
  );

  await checkoutPage.placeOrder();
  await checkoutPage.confirmOrder();

  await successPage.expectSuccessTitle();
  await successPage.returnToProducts();
});

test("Double Click Confirm Order", async ({
  productsPage,
  cartPage,
  checkoutPage,
  successPage,
}) => {
  await productsPage.addToCart(5);
  await productsPage.openCart();

  await cartPage.checkout();

  await checkoutPage.fillForm(
    "Angeliki Kapogianni",
    "Athinon 11",
    "12233",
    "Athens",
    "6973215662"
  );

  await checkoutPage.placeOrder();
  await checkoutPage.doubleClickConfirmOrder();

  await successPage.expectSingleOrderId();
});

test("Add Gaming Console and Smart watch", async ({
  productsPage,
  cartPage,
}) => {
  await productsPage.addToCart(2);
  await productsPage.addToCart(5);
  await productsPage.openCart();

  await cartPage.expectTotalAmount("€699.98");
});

test("Remove Product from cart", async ({
  productsPage,
  cartPage,
}) => {
  await productsPage.addToCart(2);
  await productsPage.addToCart(5);
  await productsPage.openCart();

  await cartPage.removeItem(5);
  await cartPage.expectItemRemoved(5);
});

test("Remove all products from cart", async ({
  productsPage,
  cartPage,
}) => {
  await productsPage.addToCart(2);
  await productsPage.addToCart(5);
  await productsPage.openCart();

  await cartPage.removeItem(5);
  await cartPage.removeItem(2);

  await cartPage.expectEmptyCartMessage();
});

test("Add Smart watch x7", async ({ productsPage }) => {
  await productsPage.addMultiple(2, 7);
  await productsPage.expectCartCount(7);
});

test("Checkout with empty cart", async ({
  productsPage,
  cartPage,
}) => {
  await productsPage.openCart();
  await cartPage.expectCheckoutDisabled();
});

test("Checkout with empty fields", async ({
  productsPage,
  cartPage,
  checkoutPage,
}) => {
  await productsPage.addToCart(5);
  await productsPage.openCart();

  await cartPage.checkout();

  await checkoutPage.fillForm(" ", " ", " ", " ", " ");
  await checkoutPage.placeOrder();

  await checkoutPage.expectEmptyFieldsErrors();
});

test("View Details Button", async ({ productsPage }) => {
  await productsPage.viewDetails(5);

  await productsPage.expectProductDescription(
    "Next-gen gaming console for immersive gaming experience"
  );
});

test("Logout", async ({ headerPage }) => {
  await headerPage.logout();
  await headerPage.expectLoggedOut();
});

test("Home Button", async ({ headerPage }) => {
  await headerPage.home();
  await headerPage.expectHomeRedirected();
});

test("Cancel Order button", async ({
  productsPage,
  cartPage,
  checkoutPage,
}) => {
  await productsPage.addToCart(5);
  await productsPage.openCart();

  await cartPage.checkout();

  await checkoutPage.fillForm(
    "Angeliki Kapogianni",
    "Athinon 11",
    "12233",
    "Athens",
    "6973215662"
  );

  await checkoutPage.cancelCheckout();
  await checkoutPage.confirmCancelCheckout();
});

test("Checkout with invalid Data", async ({
  productsPage,
  cartPage,
  checkoutPage,
}) => {
  await productsPage.addToCart(5);
  await productsPage.openCart();

  await cartPage.checkout();

  await checkoutPage.fillForm("A", "A", "1", "A", "6973");
  await checkoutPage.placeOrder();

  await checkoutPage.expectInvalidDataErrors();
});