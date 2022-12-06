describe('@myra-templates: DetailCardContent component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=detailcardcontent--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to DetailCardContent!');
    });
});
