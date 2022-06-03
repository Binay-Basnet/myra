describe('myra-ui: Element component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=element--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to Element!');
    });
});
