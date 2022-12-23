describe('@myra-components: ResponseDialog component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=responsedialog--primary'));

  it('should render the component', () => {
    cy.get('h1').should('contain', 'Welcome to ResponseDialog!');
  });
});
