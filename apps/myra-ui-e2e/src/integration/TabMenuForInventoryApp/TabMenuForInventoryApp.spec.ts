describe('myra-ui: TabMenuForInventoryApp component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=tabmenuforinventoryapp--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to TabMenuForInventoryApp!');
    });
});
