describe('myra-ui: Input component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=input--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to Input!');
    });
});
