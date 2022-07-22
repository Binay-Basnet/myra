describe('shared-ui: AlertContainer component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=alertcontainer--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to AlertContainer!');
    });
});
