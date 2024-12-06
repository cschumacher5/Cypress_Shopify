import ShopifyCart from '../pageObjects/ShopifyCart'
import ShopifyHome from '../pageObjects/ShopifyHomePage'
import ShopifyProduct from '../pageObjects/ShopifyProductPage'


describe('Create order', function () {

  before(() => {
    cy.fixture('shopify_ex').then(function (data) {
      this.data = data

    })
  })

  it('Should create an order', function () {

    const shopCartPage = new ShopifyCart()
    const shopHomePage = new ShopifyHome()
    const shopProductPage = new ShopifyProduct()

    cy.visit('https://markys-store.myshopify.com/')

    //click hamburger icon
    shopHomePage.getHamburgerIcon().click()
    //cy.get('.nav-mobile').contains('All Collections').click()
    shopProductPage.getNavPage().contains(this.data.collectionPage).click()

    //verify URL is correct
    cy.url().should('include', '/collections')

    //purchase clothing from collections
    shopProductPage.getCollection().contains(this.data.collection).click()

    cy.get('.product__title').contains('Basic Tee').click()
    cy.get('.single-option-selector').eq(0).select('Small').should('have.value', 'Small')
    shopProductPage.getAddToCart().click()
    shopProductPage.getCheckout().click()

    //verify contents in cart
    shopCartPage.getProduct().should('have.text', this.data.product1)

    //Shipping Info
    shopCartPage.getEmailAddress().type(this.data.emailAddress)
    shopCartPage.getFirstName().type(this.data.firstName)
    shopCartPage.getLastName().type(this.data.lastName)
    shopCartPage.getAddress().type(this.data.address1)
    shopCartPage.getCity().type(this.data.city, { force: true })
    shopCartPage.getState().type(this.data.state)
    shopCartPage.getZipCode().type(this.data.zipCode)

    //change to Pay on Delivery
    shopCartPage.getPayOnDelivery().click()

    //set billing address to same as shipping 
    shopCartPage.getBillingAddress().click()

    //Complete Order
    shopCartPage.getCompleteOrder().click()
    shopCartPage.getOrderConfirmation().should('have.text', this.data.orderConfirm)




  })

  it('Should create an order with gift option', function () {

    const shopCartPage = new ShopifyCart()
    const shopHomePage = new ShopifyHome()
    const shopProductPage = new ShopifyProduct()

    cy.visit('https://markys-store.myshopify.com/')

    shopHomePage.getHamburgerIcon().click()
    shopProductPage.getNavPage().contains(this.data.collectionPage).click()
  })

})