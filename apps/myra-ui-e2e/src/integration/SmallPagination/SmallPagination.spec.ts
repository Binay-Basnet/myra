describe('myra-ui: SmallPagination component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=smallpagination--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to SmallPagination!');
    });
});
