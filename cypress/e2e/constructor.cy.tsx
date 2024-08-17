describe('test Constructor ppage', () => {
  test('test getIngredients API returns ingredients', () => {
    cy.intercept('GET', `${URL}/ingredients`, {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    cy.visit('http://localhost:4000/');

    cy.wait('@getIngredients');

    cy.get('h1').should('contain', 'Dashboard');
  });
});
