describe('Home page display all products correctly', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  
  it('Searchbar works correctly', () => {
    cy.getDataTest('logo-link').should('contain.text', 'Kallos')
    cy.getDataTest('search-input').should('have.attr', 'placeholder', 'Search for products')
    .type('chalk').type('{enter}')
    cy.url().should('include', '/search?query=chalk')
    cy.getDataTest('no-products-found').should('contain.text', 'No products found for chalk')

    cy.getDataTest('search-input').clear().type('mat').type('{enter}')
    cy.url().should('include', '/search?query=mat')
    cy.getDataTest('no-products-found').should('not.exist')
    cy.getDataTest('search-results').should('contain.text', 'Search results for mat')
    cy.getDataTest('product-grid').children().should('contain.text', 'Mat').should('have.length', 2)
  })

  it('Display empty basket and sign in button', () => {
    cy.getDataTest('basket-icon').should('be.visible')
    cy.getDataTest('basket-link').contains(/my basket/i).click()
    cy.getDataTest('your-basket').should('be.visible')
    cy.getDataTest('empty-basket-message').should('be.visible')
    cy.getDataTest('basket-count').should('contain.text', '0')
    cy.getDataTest('sign-in-button').should('be.visible')


  })

    it('Display banner and filter functionality', () => {
      cy.getDataTest('banner-title').contains(/black friday/i).should('be.visible')
      cy.getDataTest('banner-description').contains(/welcome to this year larges sale/i).should('be.visible')
      cy.getDataTest('sale-code').contains(/bfriday/i).should('be.visible')
      cy.getDataTest('sale-amount').contains(/for 25% off/i).should('be.visible')

      cy.intercept('GET', '**/categories/**').as('redirecting')
      cy.getDataTest('category-selector-button').as('filter-button')
      cy.get('@filter-button').should('be.visible').click()
      cy.get('@filter-button').should('have.attr', 'aria-expanded', 'true')
      cy.getDataTest('command-input').should('be.visible').type('ankle straps').type('{enter}')
      cy.get('@filter-button').should('have.attr', 'aria-expanded', 'false')
      cy.wait('@redirecting').its('request.url').should('include', '/categories/ankle-straps')
      cy.getDataTest('product-grid').children().should('contain.text', 'Ankle Straps').should('have.length', 3)
     })

     it.only('Add products to basket and display correct count', () => {
      cy.getDataTest('product-name').as('productName')
      cy.get('@productName').first().contains(/bag with mat/i)
      cy.getDataTest('product-description').first().contains(/enhance your fitness/i)
      cy.getDataTest('product-grid').children().should('have.length', 11).first().click()

      cy.location('pathname').should('include', 'product/bag-with-mat')
      cy.getDataTest('basket-icon').should('be.visible')
      cy.getDataTest('search-input').should('be.visible')
      cy.getDataTest('logo-link').should('contain.text', 'Kallos')
      cy.getDataTest('product-image').should('be.visible').and('have.attr', 'src').should('include', 'cdn.sanity.io')
      cy.get('@productName').contains(/bag with mat/i).should('be.visible')
      cy.getDataTest('product-price').should('contain.text', 'AED 230.00')
      cy.getDataTest('product-description').should('be.visible').and('not.be.empty')
      cy.getDataTest('basket-count').should('contain.text', '0')
      cy.getDataTest('item-count').should('contain.text', '0')
      cy.getDataTest('add-to-basket-button').click()
      cy.getDataTest('item-count').should('contain.text', '1')
      cy.getDataTest('basket-count').should('contain.text', '1')
      cy.getDataTest('basket-link').click()

      cy.location('pathname').should('include', 'basket')
      cy.getDataTest('basket-product-image').should('be.visible').and('have.attr', 'src').should('include', 'cdn.sanity.io')
      cy.getDataTest('basket-product-name').contains(/bag with mat/i).should('be.visible')
      cy.getDataTest('basket-product-price').should('contain.text', 'AED 230.00')
      cy.getDataTest('basket-count').should('contain.text', '1')
      cy.getDataTest('order-summary-items').should('contain.text', '1')
      cy.getDataTest('order-summary-total').should('contain.text', 'AED 230.00')
      cy.getDataTest('checkout-button').should('be.visible')

      cy.getDataTest('add-to-basket-button').click()
      cy.getDataTest('item-count').should('contain.text', '2')
      cy.getDataTest('basket-count').should('contain.text', '2')

      cy.getDataTest('order-summary-items').should('contain.text', '2')
      cy.getDataTest('order-summary-total').should('contain.text', 'AED 460.00')


      cy.getDataTest('remove-from-basket-button').click().click()
      cy.getDataTest('your-basket').should('be.visible')
      cy.getDataTest('empty-basket-message').should('be.visible')
      cy.getDataTest('item-count').should('not.exist')
      cy.getDataTest('basket-count').should('contain.text', '0')
      cy.getDataTest('order-summary-items').should('not.exist')
      cy.getDataTest('order-summary-total').should('not.exist')


     })
})