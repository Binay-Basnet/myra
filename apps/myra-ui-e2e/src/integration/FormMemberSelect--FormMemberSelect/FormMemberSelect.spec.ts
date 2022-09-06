describe('shared-ui: FormMemberSelect component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=formmemberselect--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to FormMemberSelect!');
    });
});
