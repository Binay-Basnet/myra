describe('shared-ui: Alert component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=alert--primary'));

  it('should render the component', () => {
    cy.get('h1').should('contain', 'Welcome to Alert!');
  });
});
