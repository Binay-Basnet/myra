describe('myra-ui: Chips component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=chips--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to Chips!');
    });
});
