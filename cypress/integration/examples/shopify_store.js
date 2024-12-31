import ShopifyCart from "../pageObjects/ShopifyCart";
import ShopifyHome from "../pageObjects/ShopifyHomePage";
import ShopifyProduct from "../pageObjects/ShopifyProductPage";

describe("Create order", function () {

  beforeEach(() => {
    cy.visit("https://markys-store.myshopify.com/");

    cy.fixture("shopify_ex").then(function (data) {
      this.data = data;
    });
  });

  it("Should create an order from collections", function () {
    const shopCartPage = new ShopifyCart();
    const shopHomePage = new ShopifyHome();
    const shopProductPage = new ShopifyProduct();

    //click hamburger icon
    shopHomePage.getHamburgerIcon().click();
    shopProductPage.getNavPage().contains(this.data.collectionPage).click();

    //verify URL is correct
    cy.url().should("include", "/collections");

    //purchase clothing from collections
    shopProductPage.getCollection().contains(this.data.collection).click();

    cy.get(".product__title").contains("Basic Tee").click();
    cy.get(".single-option-selector").eq(0).select("Small").should("have.value", "Small");
    shopProductPage.getAddToCart().click();
    shopProductPage.getCheckout().click();

    //verify contents in cart
    shopCartPage.getProduct().should("have.text", this.data.product1);

    //Shipping Info
    cy.customerShipping("Baby Billy Freeman");

    //change to Pay on Delivery
    shopCartPage.getPayOnDelivery().click();

    //set billing address to same as shipping
    shopCartPage.getBillingAddress().click();

    //Complete Order
    shopCartPage.getCompleteOrder().click();
    shopCartPage
      .getOrderConfirmation()
      .should("have.text", this.data.orderConfirm);
  });

  it("Should create an order with gift option", function () {
    const shopCartPage = new ShopifyCart();
    const shopHomePage = new ShopifyHome();
    const shopProductPage = new ShopifyProduct();

    shopHomePage.getHamburgerIcon().click();
    cy.contains("Search").click();
    shopHomePage.getProductSearch().type(this.data.product2);
    cy.get('span[class="icon icon-search"]').click();
    //shopHomePage.getSearchButton().click() no idea why this doesn't work but the line above does

    //cy.get('.btn').eq(0).click()
    shopHomePage.getProductName().click();
    shopProductPage.getAddToCart().click();

    //verify contents in cart
    shopCartPage.getProduct2().should("include.text", this.data.product2);

    //cy.url().should('include', '/cart')

    shopCartPage.getGiftMessage().type("Hope you enjoy your gift!");
    shopCartPage.getGiftCheckbox().click().should("be.checked");
    //cy.get('#cartSpecialInstructions').should('have.text', 'Hope')

    shopProductPage.getCheckout().click({ force: true });

    //Shipping Info
    cy.customerShipping("Baby Billy Freeman");

    //change to Pay on Delivery
    shopCartPage.getPayOnDelivery().click();

    //set billing address to same as shipping
    shopCartPage.getBillingAddress().click();

    //Complete Order
    shopCartPage.getCompleteOrder().click();
    shopCartPage
      .getOrderConfirmation()
      .should("have.text", this.data.orderConfirm);

    //shopProductPage.getNavPage().contains(this.data.searchProduct).click()
  });

  it("Should create another order with gift option", function () {
    const shopCartPage = new ShopifyCart();
    const shopHomePage = new ShopifyHome();
    const shopProductPage = new ShopifyProduct();

    shopHomePage.getHamburgerIcon().click();
    cy.get('[href="/search"]').eq(0).click();
    shopHomePage.getProductSearch().type(this.data.product2);
    cy.get('span[class="icon icon-search"]').click();

    cy.get(".btn").eq(0).click();
    shopHomePage.getProductName().click();
    shopProductPage.getAddToCart().click();

    //verify contents in cart
    shopCartPage.getProduct2().should("include.text", this.data.product2);

    cy.url().should("include", "/cart");

    shopCartPage.getGiftMessage().type("Hope you enjoy your gift!");
    shopCartPage.getGiftCheckbox().click().should("be.checked");
    //need to figure out why text is null so i can get the following to work
    //cy.get('#cartSpecialInstructions').should('have.text', 'Hope')

    shopProductPage.getCheckout().click({ force: true });

    //Shipping Info
    cy.customerShipping("Baby Billy Freeman");

    //change to Pay on Delivery
    shopCartPage.getPayOnDelivery().click();

    //set billing address to same as shipping
    shopCartPage.getBillingAddress().click();

    //Complete Order
    shopCartPage.getCompleteOrder().click();
    shopCartPage
      .getOrderConfirmation()
      .should("have.text", this.data.orderConfirm);
  });

  it("Should iterate through products on landing page and purchase specified one with a discount", function () {
    const shopCartPage = new ShopifyCart();
    const shopHomePage = new ShopifyHome();
    const shopProductPage = new ShopifyProduct();

    cy.get(".product-wrapper").each(($el, index, $list) => {
      const productName = $el.find(".product__title").text();

      if (productName.includes("Bottle")) {
        cy.wrap($el).find(".product__title").click();
      }
    });

    shopProductPage.getAddToCart().click();
    shopProductPage.getCheckout().click();

    //Apply discount code
    cy.get('[placeholder="Discount code or gift card"]').type("twentypercent");
    cy.get('[aria-label="Apply Discount Code"]').click();

    //verify discount code applied
    cy.get(".i8os0m3").should("have.text", "TWENTYPERCENT");

    //Shipping Info
    cy.customerShipping("Baby Billy Freeman");

    //change to Pay on Delivery
    shopCartPage.getPayOnDelivery().click();

    //set billing address to same as shipping
    shopCartPage.getBillingAddress().click();

    //Complete Order
    shopCartPage.getCompleteOrder().click();
    shopCartPage
      .getOrderConfirmation()
      .should("have.text", this.data.orderConfirm);
  });

  it("Should order multiple products and verify purchase total", function () {
    const shopCartPage = new ShopifyCart();
    const shopHomePage = new ShopifyHome();
    const shopProductPage = new ShopifyProduct();

    //Click and search for product
    shopHomePage.getHamburgerIcon().click();
    cy.get('[href="/search"]').eq(0).click();
    shopHomePage.getProductSearch().type(this.data.product3);
    cy.get('span[class="icon icon-search"]').click();

    //Add to cart
    cy.get(".btn").eq(0).click();
    cy.get('[title = "Nic Cage Pillow"').click();
    shopProductPage.getAddToCart().click();

    shopHomePage.getHamburgerIcon().click();
    cy.contains("Search").click();
    shopHomePage.getProductSearch().type(this.data.product4);
    cy.get('span[class="icon icon-search"]').click();

    cy.get('[title = "Buseyism FUN"]').click();
    cy.get("#quantity").clear().type(2);
    shopProductPage.getAddToCart().click();

    var sum = 0;

    cy.get(".one-third.text-right > :nth-child(2)")
      .each(($el, index, $list) => {
        const amount = $el.text();
        var val = amount.split("$");
        val = val[1].trim();
        sum = Number(sum) + Number(val);
      })
      .then(function () {
        //cy.log(sum)
      });

    cy.get(".cart__subtotal").then(function (element) {
      const amount = element.text();
      var res = amount.split("$");
      var total = res[1].trim();
      expect(Number(total)).to.equal(sum);
    });
    shopProductPage.getCheckout().click();

    //Shipping Info
    cy.customerShipping("Baby Billy Freeman");

    //change to Pay on Delivery
    shopCartPage.getPayOnDelivery().click();

    //set billing address to same as shipping
    shopCartPage.getBillingAddress().click();

    //Complete Order
    shopCartPage.getCompleteOrder().click();
    shopCartPage
      .getOrderConfirmation()
      .should("have.text", this.data.orderConfirm);
  });

  it("Should order multiple products and verify quantity total", function () {
    const shopCartPage = new ShopifyCart();
    const shopHomePage = new ShopifyHome();
    const shopProductPage = new ShopifyProduct();

    //Click and search for product
    shopHomePage.getHamburgerIcon().click();
    //cy.contains('Search').click()
    //shopHomePage.getSearchButton().click()
    //cy.get('.wrapper > #accessibleNav > :nth-child(5)').click()
    cy.get('[href="/search"]').eq(0).click();
    shopHomePage.getProductSearch().type(this.data.product3);
    cy.get('span[class="icon icon-search"]').click();

    //Add to cart
    cy.get(".btn").eq(0).click();
    shopProductPage.getProductImage().click();
    shopProductPage.getAddToCart().click();

    shopHomePage.getHamburgerIcon().click();
    cy.contains("Search").click();
    shopHomePage.getProductSearch().type(this.data.product4);
    cy.get('span[class="icon icon-search"]').click();

    shopProductPage.getProductImage().click();
    shopProductPage.getProductQty().clear().type(this.data.productQuantity);
    shopProductPage.getAddToCart().click();

    //get quantity of product 2 and compare to quantity entered
    cy.get("input[type=number]")
      .invoke("val")
      .then((value) =>
        expect(Number(value)).to.equal(this.data.productQuantity)
      );

    shopProductPage.getCheckout().click();

    //Shipping Info
    cy.customerShipping("Baby Billy Freeman");

    //change to Pay on Delivery
    shopCartPage.getPayOnDelivery().click();

    //set billing address to same as shipping
    shopCartPage.getBillingAddress().click();

    //Complete Order
    shopCartPage.getCompleteOrder().click();
    shopCartPage
      .getOrderConfirmation()
      .should("have.text", this.data.orderConfirm);
  });
  })
