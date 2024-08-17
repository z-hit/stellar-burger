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
    cy.contains('Space sauce');
    cy.contains('Space meat');
  });

  it('test add ingredient to constructor click', () => {
    cy.visit('http://localhost:4000/');

    cy.get(`[data-cy='ingredients']`).find('button').click({ multiple: true });
    cy.get(`[data-cy='constructor']`).should('contain', 'Space bun');
    cy.get(`[data-cy='bun']`).should('contain', 'Space bun');
    cy.get(`[data-cy='main']`).should('contain', 'Space meat');
    cy.get(`[data-cy='main']`).should('contain', 'Space sauce');
  });
});
