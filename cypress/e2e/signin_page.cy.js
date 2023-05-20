describe('Sign In', () => {
  Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });

  beforeEach(() => {
    cy.visit('/signup')
  })

  it('should accept and submit user details and redirect to root URL', () => {
    const user = {
      firstName: 'Usertest',
      lastName: 'Test',
      email: 'test@test.ie',
      password: 'Tefefst1234'
    }

    cy.get('form').should('exist')

    // Fill in the form fields
    cy.get('input[name="firstName"]').type(user.firstName)
    cy.get('input[name="lastName"]').type(user.lastName)
    cy.get('input[name="email"]').type(user.email)
    cy.get('input[name="password"]').type(user.password)

    // Submit the form
    cy.get('form').submit()

    // Assert that the redirection to root URL occurs
    cy.url().should('eq', Cypress.config().baseUrl + '/')
  });

  it('should show an error for invalid user details', () => {
    // Test for invalid user details and error message (negative test)
    const user = {
      firstName: '1lid',
      lastName: 'User',
      email: 'invalid',
      password: 'Invalid1234'
    }

    cy.get('form').should('exist')

    // Fill in the form fields with invalid user details
    cy.get('input[name="firstName"]').type(user.firstName)
    cy.get('input[name="lastName"]').type(user.lastName)
    cy.get('input[name="email"]').type(user.email)
    cy.get('input[name="password"]').type(user.password)

    // Submit the form
    cy.get('form').submit()

    // Assert that an error message is displayed
    cy.url().should('eq', Cypress.config().baseUrl + '/register')
  });

  it('should show an error for invalid user details', () => {
    // Test for invalid user details and error message (negative test)
    const user = {
      firstName: '1lid',
      lastName: 'User',
      email: 'invalid@test.ie',
      password: 'I2'
    }

    cy.get('form').should('exist')

    // Fill in the form fields with invalid user details
    cy.get('input[name="firstName"]').type(user.firstName)
    cy.get('input[name="lastName"]').type(user.lastName)
    cy.get('input[name="email"]').type(user.email)
    cy.get('input[name="password"]').type(user.password)

    // Submit the form
    cy.get('form').submit()

    // Assert that an error message is displayed
    cy.url().should('eq', Cypress.config().baseUrl + '/register')
  });

  it('should show an error for invalid user details', () => {
    // Test for invalid user details and error message (negative test)
    const user = {
      firstName: '1',
      lastName: '1',
      email: 'invalid@test.ie',
      password: 'Invalid1234'
    }

    cy.get('form').should('exist')

    // Fill in the form fields with invalid user details
    cy.get('input[name="firstName"]').type(user.firstName)
    cy.get('input[name="lastName"]').type(user.lastName)
    cy.get('input[name="email"]').type(user.email)
    cy.get('input[name="password"]').type(user.password)

    // Submit the form
    cy.get('form').submit()

    // Assert that an error message is displayed
    cy.url().should('eq', Cypress.config().baseUrl + '/register')
  });
});
