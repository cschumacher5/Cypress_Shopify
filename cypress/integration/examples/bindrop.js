describe('Login to app', function() 
{

    it('Login', function() {

        cy.visit('https://shop.beyondbindrop.com/')
        cy.get('.w-wrapper').find('.text-component').contains('Electronics').click()

        //verify URL is correct
        cy.url().should('include', '/shop/electronics')

     
            })
})
     