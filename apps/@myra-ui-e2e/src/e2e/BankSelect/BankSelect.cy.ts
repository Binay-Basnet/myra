describe('@myra-forms: BankSelect component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=bankselect--primary'));

  it('should render the component', () => {
    cy.get('h1').should('contain', 'Welcome to BankSelect!');
  });
});
