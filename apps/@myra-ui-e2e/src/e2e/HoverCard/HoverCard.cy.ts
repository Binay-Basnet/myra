describe('@myra-components: HoverCard component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=hovercard--primary'));

  it('should render the component', () => {
    cy.get('h1').should('contain', 'Welcome to HoverCard!');
  });
});
