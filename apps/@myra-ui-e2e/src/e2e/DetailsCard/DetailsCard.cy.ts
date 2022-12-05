describe('@myra-templates: DetailsCard component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=detailscard--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to DetailsCard!');
    });
});
