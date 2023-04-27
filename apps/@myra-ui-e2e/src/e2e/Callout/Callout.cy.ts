describe('@myra-components: Callout component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=callout--primary'));

  it('should render the component', () => {
    cy.get('h1').should('contain', 'Welcome to Callout!');
  });
});
