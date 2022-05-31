describe('myra-ui: Tab component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=tab--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to Tab!');
    });
});
