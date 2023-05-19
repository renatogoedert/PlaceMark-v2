import 'cypress-file-upload';

describe('Placemark Page', () => {
  

  Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });

  beforeEach(() => {
    cy.visit('/login');
    cy.get('input[name="email"]').type('bart@simpson.com');
    cy.get('input[name="password"]').type('Secret1');
    cy.get('form').submit();
    cy.get('.box .button').eq(0).click();
  });

  it('should display the placemark name and the add place form', () => {
    // Assert the presence of the placemark name
    cy.get('title').should('exist');

    // Assert the presence of the add place form
    cy.get('form.box').should('exist');
    cy.get('form.box input[name="name"]').should('exist');
    cy.get('form.box input[name="lat"]').should('exist');
    cy.get('form.box input[name="lon"]').should('exist');
    cy.get('form.box input[name="des"]').should('exist');
    cy.get('form.box input[name="isPublic"]').should('exist');
    cy.get('form.box button.is-primary').should('exist');
  });

  it('should allow adding a place', () => {
    // Get the number of placemarks before addition
    cy.get('.card').its('length').then((originalCount) => {
    // Fill in the form fields with the desired values
      cy.get('form.box input[name="name"]').type('New Place');
      cy.get('form.box input[name="lat"]').type('50.456');
      cy.get('form.box input[name="lon"]').type('100.012');
      cy.get('form.box input[name="des"]').type('This is a new place');
      cy.get('form.box input[name="isPublic"]').check();

      // Submit the form
      cy.get('form.box').submit();

      // Assert that the placemark has been added
      cy.get('.card').should('have.length', originalCount + 1);
    });
  });

  it('should fail if values are left empty', () => {
    // Get the number of placemarks before addition
    cy.get('.card').its('length').then((originalCount) => {
      // Submit the form without filling in any values
      cy.get('form.box').submit();
  
      // Assert that the number of placemarks remains the same
      cy.title().should('eq', 'Add place error');
    });
  });

  it('should fail if lat value is above 90', () => {
    // Submit the form with a latitude value above 90
    cy.get('form.box input[name="name"]').type('New Place');
    cy.get('form.box input[name="lat"]').type('91.456');
    cy.get('form.box input[name="lon"]').type('100.012');
    cy.get('form.box input[name="des"]').type('This is a new place');
    cy.get('form.box input[name="isPublic"]').check();

    cy.get('form.box').submit();
  
    // Assert that the form submission fails and an error message is displayed
    cy.title().should('eq', 'Add place error');
  });
  
  it('should fail if lon value is above 180', () => {
    // Submit the form with a longitude value above 180
    cy.get('form.box input[name="name"]').type('New Place');
    cy.get('form.box input[name="lat"]').type('50.456');
    cy.get('form.box input[name="lon"]').type('181.012');
    cy.get('form.box input[name="des"]').type('This is a new place');
    cy.get('form.box input[name="isPublic"]').check();

    cy.get('form.box').submit();
  
    // Assert that the form submission fails and an error message is displayed
    cy.title().should('eq', 'Add place error');
  });

  it('should be able to delete a place', () => {
    // Get the number of places before deletion
    cy.get('.card').its('length').then((originalCount) => {
      // Click on the delete button of the first place
      cy.get('.card .button').eq(3).click();
  
      // Assert that the place has been deleted
      cy.get('.card').should('have.length', originalCount - 2);
    });
  });

  it('should be able to add a place to favourites', () => {
    // Click on the favourite button
    cy.get('.card .button').eq(1).click();
  
    // Assert that the place has been deleted
    cy.title().should('eq', 'Placemark Dashboard');
  });

  it('should allow uploading an image', () => {
    // Provide the path to the image file to be uploaded
    const imagePath = '/images/map-and-compass.png';
  
    // Attach the image file to the file input field
    cy.fixture(imagePath).then((fileContent) => {
      cy.get('input[name="imagefile"]').attachFile({
        fileContent,
        fileName: 'image.png',
        mimeType: 'image/png'
      });
    });
  
    // Submit the form
    cy.get('button[type="submit"]').first().click();
  
    // Assert that the image is successfully uploaded and displayed
    cy.get('.box .button').eq(0).click();
    cy.get('.card-image img').should('be.visible');
  });
});