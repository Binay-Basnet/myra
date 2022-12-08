describe('@myra-templates: DetailPageTabs component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=detailpagetabs--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to DetailPageTabs!');
    });
});
