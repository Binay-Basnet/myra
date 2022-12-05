describe('@myra-templates: DetailCardStats component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=detailcardstats--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to DetailCardStats!');
    });
});
