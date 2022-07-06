describe('shared-ui: ShorcutTab component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=shorcuttab--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to ShorcutTab!');
    });
});
