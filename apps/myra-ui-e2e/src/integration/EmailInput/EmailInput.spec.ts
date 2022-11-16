describe('myra-ui: EmailInput component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=emailinput--primary'));

  it('should render the component', () => {
    cy.get('h1').should('contain', 'Welcome to EmailInput!');
  });
});
