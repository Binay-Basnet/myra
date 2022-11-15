describe('myra-ui: PasswordInput component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=passwordinput--primary'));

  it('should render the component', () => {
    cy.get('h1').should('contain', 'Welcome to PasswordInput!');
  });
});
