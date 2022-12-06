describe('@myra-components: TabMenu component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=tabmenu--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to TabMenu!');
    });
});
