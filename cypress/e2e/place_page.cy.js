describe('Place Page', () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
      return false;
    });
  
    beforeEach(() => {
      cy.visit('/login');
      cy.get('input[name="email"]').type('bart@simpson.com');
      cy.get('input[name="password"]').type('Secret1');
      cy.get('form').submit();
      cy.get('.box .button').eq(0).click();
      cy.get('.card .button').eq(0).click();
    });
  
    it('should display the add review form and add discussion form', () => {
      // Assert the presence of the add place form
      cy.get('form.box').should('exist');
      cy.get('form.box input[name="name"]').should('exist');
      cy.get('form.box input[name="rating"]').should('exist');
      cy.get('form.box input[name="fullReview"]').should('exist');
      cy.get('form.box input[name="text"]').should('exist');
      cy.get('form.box button.is-primary').should('exist');
    });
  
    it('should allow adding a review', () => {
      // Fill in the review form fields with the desired values
      cy.get('form.box input[name="name"]').type('John Doe');
      cy.get('form.box input[name="rating"]').type('5');
      cy.get('form.box input[name="fullReview"]').type('This place is amazing!');
  
      // Submit the review form
      cy.get('form.box').contains('label', 'Enter Your Review:').parent('form').submit();
  
      // Assert that the review is successfully added (e.g., display a success message, update the UI, etc.)
      cy.contains('.card', 'John Doe').should('exist');
    });
  
    it('should allow adding a discussion', () => {
      // Fill in the discussion form fields with the desired values
      cy.get('form.box input[name="text"]').type("Let's talk about this place.");
  
      // Submit the discussion form
      cy.get('form.box').contains('label', 'Enter Your Discussion:').parent('form').submit();
  
      // Assert that the discussion is successfully added (e.g., display a success message, update the UI, etc.)
      cy.contains('.card', 'Bart').should('exist');
    });
  
    it('should share a link', () => {
      cy.window().then((win) => {
        cy.document().then((doc) => {
          doc.addEventListener('paste', (event) => {
            const clipboardData = event.clipboardData || window.clipboardData;
            const text = clipboardData.getData('text');
            // You can assert or perform actions based on the clipboard content
            cy.wrap(text).should('contain', 'place');
          });
          win.document.execCommand('paste');
        });
      });
    });
  
    it('should be able to add a place to favorites', () => {
      // Click on the favorite button
      cy.get('.card .button').eq(1).click();
  
      // Assert that the place has been deleted
      cy.title().should('eq', 'Placemark Dashboard');
    });
  });
  