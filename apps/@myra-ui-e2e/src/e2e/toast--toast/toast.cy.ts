describe('@myra-components: toast component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=toast--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to toast!');
    });
});
