describe('myra-ui: PhoneNumber component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=phonenumber--primary'));

  it('should render the component', () => {
    cy.get('h1').should('contain', 'Welcome to PhoneNumber!');
  });
});
