describe('shared-ui: FormSection component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=formsection--primary'));

  it('should render the component', () => {
    cy.get('h1').should('contain', 'Welcome to FormSection!');
  });
});
