// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --


Cypress.Commands.add('customerShipping', (customerName) => { 
    
  cy.get('#email').type('csschumacher+unclebabybilly@gmail.com')
  cy.get('#TextField0').type('Baby Billy')
  cy.get('#TextField1').type('Freeman')
  cy.get('#shipping-address1').type('7733 Marble Crest Dr')
  cy.get('#TextField4').click({force: true}).type('Austin')
  cy.get('#Select1').type('Texas')
  cy.get('#TextField5').type('78747')

  //shopCartPage.getFirstName().type(this.data.firstName)
  //shopCartPage.getLastName().type(this.data.lastName)
  //shopCartPage.getAddress().type(this.data.address1)
  //shopCartPage.getCity().type(this.data.city, { force: true })
  //shopCartPage.getState().type(this.data.state)
  //shopCartPage.getZipCode().type(this.data.zipCode)

      })

    

// Cypress.Commands.add('selectProduct', (productName) => { 
//   cy.get('h4.card-title').each(($el, index, $list) => 
//   {
//       if ($el.text().includes(productName)) {
//           cy.get('button.btn.btn-info').eq(index).click()

//       }

//   })




//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
  })