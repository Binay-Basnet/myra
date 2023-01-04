describe('@myra-components: Tooltip component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=tooltip--primary'));

  it('should render the component', () => {
    cy.get('h1').should('contain', 'Welcome to Tooltip!');
  });
});
