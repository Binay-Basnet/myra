describe('myra-ui: Happy component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=happy--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to Happy!');
    });
});
