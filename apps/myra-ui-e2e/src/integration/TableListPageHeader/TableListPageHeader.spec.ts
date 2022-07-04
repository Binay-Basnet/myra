describe('shared-ui: TableListPageHeader component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=tablelistpageheader--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to TableListPageHeader!');
    });
});
