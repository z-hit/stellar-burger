/// <reference types="cypress" />

describe('test orderBurger process', () => {
  const testUrl = 'http://localhost:4000/';

  beforeEach(() => {
    cy.fixture('tokens.json').as('tokens');

    cy.visit(testUrl, {
      onBeforeLoad: function (window) {
        window.localStorage.setItem('token', '@tokens.accessToken');
      }
    });

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

  it('test user is authed', () => {
    cy.visit(testUrl);
    cy.get(`[data-cy='user-name']`);
  });
});
