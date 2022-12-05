describe('@myra-forms: MemberSelect component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=memberselect--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to MemberSelect!');
    });
});
