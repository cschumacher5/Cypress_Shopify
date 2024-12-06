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
        cy.visit(Cypress.env('url')+ "/angularpractice/")
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
        var sum = 0

        cy.get('tr td:nth-child(4) strong').each(($el, index, $list) => {

          const amount=$el.text()
          var res=amount.split(" ")
          res=res[1].trim()
          sum=Number(sum)+Number(res)
          
        }).then(function(){

          cy.log(sum)

        })

        cy.get('h3 strong').then(function(element)
        {

          const amount=element.text()
          var res=amount.split(" ")
          var total=res[1].trim()
          expect(Number(total)).to.equal(sum)

        })

        checkoutPage.checkoutButton().click()
        checkoutPage.deliveryLocation().type('United States')
        checkoutPage.selectCountry().click()
        checkoutPage.termsCheckbox().click({force: true})
        checkoutPage.purchaseButton().click()
        checkoutPage.successAlert().should('contain', 'Success!')

        Cypress.config('defaultCommandTimeout', 8000)

    })

})