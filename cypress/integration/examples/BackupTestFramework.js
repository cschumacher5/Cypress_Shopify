import CheckoutPage from '../pageObjects/CheckoutPage'
import HomePage from '../pageObjects/homePage'
import ProductPage from '../pageObjects/ProductPage'

 describe('My First Test Suite', function() 
{

    before(() => {
        // root-level hook
        // runs once before all tests
        cy.fixture('example').then(function(data)
        {
this.data=data

        })
      })    

    it('My first test case!', function() {

        const homePage=new HomePage()
        const productPage=new ProductPage()
        const checkoutPage=new CheckoutPage()

       //first test - going to the URL
        cy.visit("https://rahulshettyacademy.com/angularpractice/")
        homePage.getEditBox().type(this.data.name)
        homePage.getGender().select(this.data.gender)
        homePage.getTwoWayDataBinding().should('have.value', this.data.name)
        //check min length property for the Name field
        homePage.getEditBox().should('have.attr', 'minlength', '2')
        homePage.getEntrepreneurRadioButton().should('be.disabled')

        //navigate to shop page
        homePage.getShopTab().click()

        this.data.productName.forEach(function(element){
          cy.selectProduct(element)

        }) 

        productPage.checkoutButton().click()

        checkoutPage.checkoutButton().click()
        cy.get('#country').type('United States')
        cy.get('.checkbox-primary').click()
        cy.get('.btn-success').click()
        cy.get('.alert-success').should('contain', 'Success!')

    })

})