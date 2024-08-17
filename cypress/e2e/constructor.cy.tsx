/// <reference types="cypress" />

describe('test Constructor page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4000/');
    cy.intercept('GET', `api/ingredients`, {
      fixture: 'ingredients.json'
    });
  });

  it('test getIngredients API returns ingredients', () => {
    cy.visit('http://localhost:4000/');

    cy.contains('Space bun');
    cy.contains('Space souce');
    cy.contains('Space meat');
  });
});
