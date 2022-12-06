describe('@myra-templates: DetailPageContentCard component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=detailpagecontentcard--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to DetailPageContentCard!');
    });
});
