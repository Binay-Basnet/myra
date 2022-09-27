describe('shared-ui: ChangePasswordLayout component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=changepasswordlayout--primary'));

  it('should render the component', () => {
    cy.get('h1').should('contain', 'Welcome to ChangePasswordLayout!');
  });
});
