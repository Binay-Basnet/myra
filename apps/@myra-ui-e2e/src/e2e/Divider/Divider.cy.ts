describe('@myra-foundations: Divider component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=divider--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to Divider!');
    });
});
