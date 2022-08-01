describe('shared-ui: ChakraList component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=chakralist--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to ChakraList!');
    });
});
