describe('shared-ui: DetailPageQuickLinks component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=detailpagequicklinks--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to DetailPageQuickLinks!');
    });
});
