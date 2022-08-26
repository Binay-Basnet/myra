describe('shared-ui: FormAccountSelect component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=formaccountselect--primary'));

  it('should render the component', () => {
    cy.get('h1').should('contain', 'Welcome to FormAccountSelect!');
  });
});
