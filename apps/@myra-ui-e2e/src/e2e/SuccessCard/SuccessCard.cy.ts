describe('@myra-templates: SuccessCard component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=successcard--primary'));

  it('should render the component', () => {
    cy.get('h1').should('contain', 'Welcome to SuccessCard!');
  });
});
