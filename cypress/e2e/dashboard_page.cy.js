describe('Dashboard', () => {
  
    beforeEach(() => {
      cy.visit('/login');
      cy.get('input[name="email"]').type('bart@simpson.com');
      cy.get('input[name="password"]').type('Secret1');
      cy.get('form').submit();
      cy.url().should('eq', Cypress.config().baseUrl + '/dashboard');
    });
  
    it('should contain specific links in the dashboard', () => {
      // Visit the dashboard explicitly
      cy.visit('/dashboard');
  
      // Assert the presence and attributes of the specific links in the dashboard
      cy.get('a#public').should('have.attr', 'href', '/public');
      cy.get('a#noticeboard').should('have.attr', 'href', '/dashboard');
      cy.get('a#dashboard').should('have.attr', 'href', '/noticeboard');
      cy.get('a#about').should('have.attr', 'href', '/about');
      cy.get('a#logout').should('have.attr', 'href', '/logout');
      cy.contains('.box', 'Favourites').should('exist');
    });
  
    it('should have a form with a single input text field', () => {
      // Assert the presence of the form and the input text field
      cy.get('form').should('exist');
      cy.get('form input[type="text"]').should('exist');
    });

    it('should open a placemark', () => {
      // Click on the first element
      cy.get('.box .button').eq(0).click();
      
      // Assert that the URL contains "/place"
      cy.url().should('contain', '/placemark');
    });
  
    it('should successfully add a Placemark', () => {
      const placemarkName = 'New Placemark';
  
      // Fill in the input text field with the placemark name
      cy.get('form input[type="text"]').type(placemarkName);
  
      // Submit the form
      cy.get('form').submit();
  
      // Assert that the Placemark is successfully added
      cy.contains('.box', placemarkName).should('exist');
    });
  
    it('should be able to delete a placemark', () => {
      // Get the number of placemarks before deletion
      cy.get('.box').its('length').then((originalCount) => {
        // Click on the delete button of the first placemark
        cy.get('.box .button').eq(1).click();
  
        // Confirm the deletion if necessary (e.g., through a confirmation dialog)
  
        // Assert that the placemark has been deleted
        cy.get('.box').should('have.length', originalCount - 1);
      });
    });
  });
  
  