class ShopifyCart
{

    getEmailAddress()
    {
        return cy.get('#email')   
    }

    // getFirstName()
    // {
    //     return cy.get('[placeholder="First name (optional)"]')
    // }

    getLastName()
    {
        return cy.get('#TextField1')   
    }

    getAddress()
    {
        return cy.get('#shipping-address1')   
    }

    getCity()
    {
        return cy.get('#TextField4')   
    }
    
    getState()
    {
        return cy.get('#Select1')   
    }

    getZipCode()
    {
        return cy.get('#TextField5')   
    }

    getPayOnDelivery()
    {
        return cy.get('#basic-paymentOnDelivery')   
    }

    getProduct()
    {
        return cy.contains('Basic Tee')   
    }

    getProduct2()
    {
        return cy.get('.cart__product')
    }

    getBillingAddress()
    {
        return cy.get('#billing_address_selector-shipping_address')   
    }

    getCompleteOrder()
    {
        return cy.get('#checkout-pay-button')  
    }

    getOrderConfirmation()
    {
        return cy.get('.heading-2')  
    }

    getGiftMessage()
    {
        return cy.get('.cart__instructions')
    }

    getGiftCheckbox()
    {
        return cy.get('[type="checkbox"]')
    }
}

export default ShopifyCart

