describe('myra-ui: Navbarfordaashboard component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=navbarfordaashboard--primary'));

  it('should render the component', () => {
    cy.get('h1').should('contain', 'Welcome to Navbarfordaashboard!');
  });
});
