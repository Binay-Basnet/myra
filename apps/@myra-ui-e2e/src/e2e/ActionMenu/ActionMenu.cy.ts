describe('@myra-components: ActionMenu component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=actionmenu--primary'));

  it('should render the component', () => {
    cy.get('h1').should('contain', 'Welcome to ActionMenu!');
  });
});
