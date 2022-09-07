describe('shared-ui: selectionHook component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=selectionhook--primary'));

  it('should render the component', () => {
    cy.get('h1').should('contain', 'Welcome to selectionHook!');
  });
});
