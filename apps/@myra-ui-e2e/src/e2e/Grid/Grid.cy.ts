describe('@myra-foundations: Grid component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=grid--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to Grid!');
    });
});
