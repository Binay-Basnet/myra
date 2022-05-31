describe('myra-ui: GridItem component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=griditem--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to GridItem!');
    });
});
