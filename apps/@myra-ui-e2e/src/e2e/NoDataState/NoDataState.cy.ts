describe('@myra-templates: NoDataState component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=nodatastate--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to NoDataState!');
    });
});
