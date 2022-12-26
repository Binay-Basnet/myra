describe('@myra-templates: ChangePasswordContainerLayout component', () => {
  beforeEach(() =>
    cy.visit('/iframe.html?id=changepasswordcontainerlayout--primary&args=children;')
  );

  it('should render the component', () => {
    cy.get('h1').should('contain', 'Welcome to ChangePasswordContainerLayout!');
  });
});
