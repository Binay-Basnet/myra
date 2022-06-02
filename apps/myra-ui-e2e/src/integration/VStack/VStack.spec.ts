describe('myra-ui: VStack component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=vstack--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to VStack!');
    });
});
