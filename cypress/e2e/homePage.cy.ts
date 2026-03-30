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
      cy.getDataTest('product-grid').children().should('have.length', 11)
     })
})

// nokar25646@flownue.com
// H3g0m1234