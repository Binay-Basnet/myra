describe('@myra-templates: TabColumn component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=tabcolumn--primary'));

  it('should render the component', () => {
    cy.get('h1').should('contain', 'Welcome to TabColumn!');
  });
});
