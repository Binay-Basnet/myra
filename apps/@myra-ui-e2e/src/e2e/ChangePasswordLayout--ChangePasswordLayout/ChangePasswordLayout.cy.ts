describe('@myra-templates: ChangePasswordLayout component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=changepasswordlayout--primary&args=children;'));

  it('should render the component', () => {
    cy.get('h1').should('contain', 'Welcome to ChangePasswordLayout!');
  });
});
