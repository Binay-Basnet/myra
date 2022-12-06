describe('@myra-templates: WipState component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=wipstate--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to WipState!');
    });
});
