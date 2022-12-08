describe('@myra-templates: TopLevelHeader component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=toplevelheader--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to TopLevelHeader!');
    });
});
