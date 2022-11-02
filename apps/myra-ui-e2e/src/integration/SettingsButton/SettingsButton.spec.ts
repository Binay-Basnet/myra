describe('shared-ui: SettingsButton component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=settingsbutton--primary'));

  it('should render the component', () => {
    cy.get('h1').should('contain', 'Welcome to SettingsButton!');
  });
});
