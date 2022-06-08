describe('myra-ui: MainLayoutInventory component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=mainlayoutinventory--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to MainLayoutInventory!');
    });
});
