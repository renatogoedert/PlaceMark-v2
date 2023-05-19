import 'cypress-file-upload';

describe('Public Page', () => {
  

  Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });

  beforeEach(() => {
    cy.visit('/login');
    cy.get('input[name="email"]').type('bart@simpson.com');
    cy.get('input[name="password"]').type('Secret1');
    cy.get('form').submit();
    cy.get('a#public.button').click({ force: true });
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
    cy.get('a#public.button').click({ force: true });
    cy.get('.card-image img').should('be.visible');
  });
});