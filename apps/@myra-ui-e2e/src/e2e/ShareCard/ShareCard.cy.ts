describe('@myra-templates: ShareCard component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=sharecard--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to ShareCard!');
    });
});
