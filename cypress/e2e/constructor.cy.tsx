/// <reference types="cypress" />

describe('test Constructor ppage', () => {
  it('test getIngredients API returns ingredients', () => {
    cy.intercept('GET', `${URL}/ingredients`, {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    cy.visit('http://localhost:4000/');

    cy.wait('@getIngredients');

    cy.get('[data-testid="ingredients"]').should('contain', {
      _id: '111',
      name: 'Space bun',
      type: 'bun',
      proteins: 11,
      fat: 21,
      carbohydrates: 31,
      calories: 111,
      price: 100,
      image: 'image-url',
      image_large: 'some-url',
      image_mobile: 'some-url2'
    });
  });
});
