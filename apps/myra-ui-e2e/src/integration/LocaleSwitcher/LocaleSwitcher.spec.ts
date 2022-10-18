describe('shared-ui: LocaleSwitcher component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=localeswitcher--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to LocaleSwitcher!');
    });
});
