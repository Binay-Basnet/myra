describe('myra-ui: Accordion component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=accordion--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to Accordion!');
    });
});
