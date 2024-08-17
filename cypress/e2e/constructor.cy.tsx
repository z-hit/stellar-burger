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

    cy.get(`[data-cy='ingredients']`).should('contain', 'Space bun');
    cy.get(`[data-cy='ingredients']`).should('contain', 'Space meat');
    cy.get(`[data-cy='ingredients']`).should('contain', 'Space sauce');
  });

  it('test add ingredients to constructor', () => {
    cy.visit('http://localhost:4000/');

    cy.get(`[data-cy='ingredients']`).find('button').click({ multiple: true });
    cy.get(`[data-cy='bun']`).should('contain', 'Space bun');
    cy.get(`[data-cy='main']`).should('contain', 'Space meat');
    cy.get(`[data-cy='main']`).should('contain', 'Space sauce');
  });

  it('test open and close ingredient modal', () => {
    cy.visit('http://localhost:4000/');

    cy.get(`[data-cy='ingredient']`).first().click();
    cy.get(`[data-cy='modal']`).should('exist');
    cy.get(`[data-cy='modal']`).find('button').click();
    cy.get(`[data-cy='modal']`).should('not.exist');
    cy.get(`[data-cy='ingredient']`).first().click();
    cy.get(`[data-cy='modal']`).should('exist');
    cy.get('body').click('topLeft');
    cy.get(`[data-cy='modal']`).should('not.exist');
  });
});
