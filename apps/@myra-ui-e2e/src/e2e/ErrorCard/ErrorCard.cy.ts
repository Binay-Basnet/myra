describe('@myra-templates: ErrorCard component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=errorcard--primary'));

  it('should render the component', () => {
    cy.get('h1').should('contain', 'Welcome to ErrorCard!');
  });
});
