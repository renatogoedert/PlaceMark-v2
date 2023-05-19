describe('Log In', () => {
  beforeEach(() => {
    cy.visit('/login')
  })

  it('should fail with a non-registered email and password', () => {
    const user = {
      email: 'nonregistere',
      password: 'Invalid1234'
    }

    cy.get('form').should('exist')
    cy.get('input[name="email"]').should('exist')
    cy.get('input[name="password"]').should('exist')

    // Fill in the email and password fields
    cy.get('input[name="email"]').type(user.email)
    cy.get('input[name="password"]').type(user.password)

    // Submit the form
    cy.get('form').submit()

    // Assert that the user is not redirected to the dashboard
    cy.url().should('eq', Cypress.config().baseUrl + '/authenticate')
  })

  it('should have email and password fields in the form and redirect to dashboard', () => {
    const user = {
      email: 'bart@simpson.com',
      password: 'Secret1'
    }

    cy.get('form').should('exist')
    cy.get('input[name="email"]').should('exist')
    cy.get('input[name="password"]').should('exist')

    // Fill in the email and password fields
    cy.get('input[name="email"]').type(user.email)
    cy.get('input[name="password"]').type(user.password)

    // Submit the form
    cy.get('form').submit()

    // Assert that the user is redirected to the dashboard
    cy.url().should('eq', Cypress.config().baseUrl + '/dashboard')
  })
})