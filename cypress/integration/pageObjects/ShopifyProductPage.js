class ShopifyProduct
{

    getCollection()
    {
        return cy.get('.featured-box__body')  
    }

    getNavPage(){
        return cy.get('.nav-mobile')
    }

    getAddToCart(){
        return cy.get('#addToCart')
    }

    getCheckout(){
        return cy.get('#checkout')
    }

    getSearchBar(){
        return cy.get('Search our store')
    }
    getProductImage(){
        return cy.get('img')
    }
    getProductQty(){
        return cy.get('#quantity')
    }
}

export default ShopifyProduct
