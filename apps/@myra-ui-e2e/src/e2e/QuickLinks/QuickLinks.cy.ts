describe('@myra-components: QuickLinks component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=quicklinks--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to QuickLinks!');
    });
});
