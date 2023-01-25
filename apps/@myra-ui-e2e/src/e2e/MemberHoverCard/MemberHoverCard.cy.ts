describe('@myra-templates: MemberHoverCard component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=memberhovercard--primary'));

  it('should render the component', () => {
    cy.get('h1').should('contain', 'Welcome to MemberHoverCard!');
  });
});
