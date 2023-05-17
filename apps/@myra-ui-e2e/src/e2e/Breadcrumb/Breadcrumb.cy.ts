describe('@myra-components: Breadcrumb component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=breadcrumb--primary'));

  it('should render the component', () => {
    cy.get('h1').should('contain', 'Welcome to Breadcrumb!');
  });
});
