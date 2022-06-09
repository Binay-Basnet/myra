describe('myra-ui: TableSearch component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=tablesearch--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to TableSearch!');
    });
});
