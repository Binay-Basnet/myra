describe('@myra-components: AlertDialog component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=alertdialog--primary'));

  it('should render the component', () => {
    cy.get('h1').should('contain', 'Welcome to AlertDialog!');
  });
});
