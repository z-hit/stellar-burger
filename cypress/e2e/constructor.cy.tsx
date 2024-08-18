/// <reference types="cypress" />

describe('test Constructor page', () => {
  const testUrl = 'http://localhost:4000/';

  beforeEach(() => {
    cy.intercept('GET', `api/ingredients`, {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    cy.intercept('GET', `api/auth/user`, {
      fixture: 'user.json'
    });

    cy.intercept('POST', `api/orders`, {
      fixture: 'order.json'
    }).as('postOrder');
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

  it('test open modal and close with "close" button', () => {
    cy.visit('http://localhost:4000/');

    cy.get(`[data-cy='ingredient']`).first().click();
    cy.get(`[data-cy='modal']`).should('exist');
    cy.get(`[data-cy='modal']`).find('button').click();
    cy.get(`[data-cy='modal']`).should('not.exist');
  });

  it('test open modal and close with "overlay" click', () => {
    cy.visit('http://localhost:4000/');

    cy.get(`[data-cy='ingredient']`).first().click();
    cy.get(`[data-cy='modal']`).should('exist');
    cy.get('body').click('topLeft');
    cy.get(`[data-cy='modal']`).should('not.exist');
  });

  it('test user is authed', () => {
    cy.setCookie('accessToken', 'someToken');
    cy.visit(testUrl);
    cy.get(`[data-cy='user-name']`).should('contain.text', 'cat42');
  });
});
