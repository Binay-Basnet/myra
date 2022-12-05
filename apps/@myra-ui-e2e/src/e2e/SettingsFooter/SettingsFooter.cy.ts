describe('@myra-templates: SettingsFooter component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=settingsfooter--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to SettingsFooter!');
    });
});
