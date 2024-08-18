/// <reference types="cypress" />

describe('test Constructor page', () => {
  const testUrl = 'http://localhost:4000/';
  const modal = `[data-cy='modal']`;
  const ingredientsSection = `[data-cy='ingredients']`;
  const constructorSection = `[data-cy='constructor']`;
  const bunTop = `[data-cy='bun-top']`;
  const bunBottom = `[data-cy='bun-bottom']`;
  const noBun = `[data-cy='no-bun']`;
  const main = `[data-cy='main']`;
  const ingredient = `[data-cy='ingredient']`;

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
    cy.visit(testUrl);

    cy.get(ingredientsSection).should('contain', 'Space bun');
    cy.get(ingredientsSection).should('contain', 'Space meat');
    cy.get(ingredientsSection).should('contain', 'Space sauce');
  });

  it('test add ingredients to constructor', () => {
    cy.visit(testUrl);

    cy.get(ingredientsSection).find('button').click({ multiple: true });
    cy.get(bunTop).should('contain', 'Space bun');
    cy.get(bunBottom).should('contain', 'Space bun');
    cy.get(main).should('contain', 'Space meat');
    cy.get(main).should('contain', 'Space sauce');
  });

  it('test open modal and close with "close" button', () => {
    cy.visit(testUrl);

    cy.get(ingredient).first().click();
    cy.get(modal).should('exist');
    cy.get(modal).find('button').click();
    cy.get(modal).should('not.exist');
  });

  it('test open modal and close with "overlay" click', () => {
    cy.visit(testUrl);

    cy.get(ingredient).first().click();
    cy.get(modal).should('exist');
    cy.get('body').click('topLeft');
    cy.get(modal).should('not.exist');
  });

  it('test user is authed', () => {
    cy.setCookie('accessToken', 'someToken');
    cy.visit(testUrl);
    cy.get(`[data-cy='user-name']`).should('contain.text', 'cat42');
  });

  it('test burger constructed, ordered, Modal opens, order number correct, modal closes, constructor clears', () => {
    cy.setCookie('accessToken', 'someToken');
    cy.visit(testUrl);

    cy.get(ingredientsSection).find('button').click({ multiple: true });
    cy.get(bunTop).should('contain', 'Space bun');
    cy.get(bunBottom).should('contain', 'Space bun');
    cy.get(main).should('contain', 'Space meat');
    cy.get(main).should('contain', 'Space sauce');
    cy.contains('Оформить заказ').click();
    cy.get(modal).should('exist');
    cy.get(modal).find('h2').should('contain.text', '98765');
    cy.get(modal).find('button').click();
    cy.get(modal).should('not.exist');
    cy.get(main).should('contain.text', 'Выберите начинку');
    cy.get(noBun).should('contain.text', 'Выберите булки');
  });
});
