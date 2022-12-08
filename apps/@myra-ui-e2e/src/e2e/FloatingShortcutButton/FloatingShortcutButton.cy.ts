describe('@myra-components: FloatingShortcutButton component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=floatingshortcutbutton--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to FloatingShortcutButton!');
    });
});
