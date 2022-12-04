describe('@myra-components: PageHeaderTab component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=pageheadertab--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to PageHeaderTab!');
    });
});
