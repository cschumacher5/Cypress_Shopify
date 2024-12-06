describe('Login to app', function() 
{

    it('Login', function() {

        cy.visit('https://app.shippingeasy.com/')
        cy.get('#user_email').type('craig+stampsprodtest@shippingeasy.com')
        cy.get('#user_password').type('Sh1pp1ngeasy123')
        cy.get('.btn').click()
        cy.url().should('include', '/orders')
    
        cy.contains('Add Orders').click()
        cy.contains('Create Label').click()



        //get order number to validate later
        //cy.get('.panel-modal .se-input-label').eq(0).then($order => {
            //const orderNumber = $order.text()
    
        //Modal for Orders
        cy.get('#first_name').type('Luke')
        cy.get('#last_name').type('Skywalker')
        cy.get('#address').type('7733 MARBLE CREST DR')
        cy.get('#city').type('AUSTIN')
        cy.get('#state').select('TX')
        cy.get('.postal_code').type('78747-4075')
        cy.get('#email').type('csschumacher+test@gmail.com')
        cy.get('#productItemAutosuggest').type(' 101')

        //Really need to figure out how to grab the order number to do an assertion
        //const orderNumber = cy.get('.panel-modal .se-input-label').eq(0).text().then(function(order){

        //})

        //make weight 1 lb
        cy.get('.panel-modal .se-number-input__incrementer').eq(1).click({force: true})

        //click Add Order button
        cy.get('.panel-modal .se-button__content').eq(1).click()

        //After order is created need to validate Order number is on table
        cy.get('go2072408551').should('have.text', 'Order created.')
        //cy.get('.orders-content').should('have.text', orderNumber)

    })
})

//})

    //it('Create manual order', function() {
        //cy.wait(4000)
        //cy.contains('span', 'Add Orders').click()
        //cy.contains('createLabel').click()
        //cy.get('.se-slideout').find('.se-dropdown').contains('createLabel').click()
        //cy.get('[class^="_createLabel"]').click()
        //cy.get('#nav-experiment-add-manual-order').click()
        //cy.get('._createLabel_a4l2k_20 > .se-dropdown > .se-link').click()
    //})