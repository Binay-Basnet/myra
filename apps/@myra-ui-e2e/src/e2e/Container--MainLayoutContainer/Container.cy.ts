describe('@myra-templates: MainLayoutContainer component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=mainlayoutcontainer--primary'));

  it('should render the component', () => {
    cy.get('h1').should('contain', 'Welcome to MainLayoutContainer!');
  });
});
