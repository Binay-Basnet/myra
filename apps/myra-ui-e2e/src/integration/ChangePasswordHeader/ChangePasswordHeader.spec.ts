describe('shared-ui: ChangePasswordHeader component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=changepasswordheader--primary'));

  it('should render the component', () => {
    cy.get('h1').should('contain', 'Welcome to ChangePasswordHeader!');
  });
});
