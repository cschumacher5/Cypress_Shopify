describe('Login to app', function() 
{

    it('Login', function() {

        cy.visit('https://app.shippingeasy.com/')
        cy.get('#user_email').type('craig+stampsprodtest@shippingeasy.com')
        cy.get('#user_password').type('Sh1pp1ngeasy123')
        cy.get('.btn').click()
        cy.url().should('include', '/orders')

        //Verify when auto refill toggle enabled it is "on"
        cy.contains('Carrier Funds').click()
        cy.url().should('include', '/settings/providers')
        cy.get('.se-switch__label').click()
        cy.get('.se-switch__text').should('contain', 'on')
        
    })
})