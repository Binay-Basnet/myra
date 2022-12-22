describe('@myra-templates: ShareMemberCard component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=sharemembercard--primary'));

  it('should render the component', () => {
    cy.get('h1').should('contain', 'Welcome to ShareMemberCard!');
  });
});
