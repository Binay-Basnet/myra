describe('@myra-forms: components component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=components--primary'));

  it('should render the component', () => {
    cy.get('h1').should('contain', 'Welcome to components!');
  });
});
