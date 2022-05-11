describe('myra-ui: ChakraTable component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=chakratable--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to ChakraTable!');
    });
});
