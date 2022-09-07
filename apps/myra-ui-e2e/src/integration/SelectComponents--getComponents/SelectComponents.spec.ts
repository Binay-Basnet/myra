describe('shared-ui: getComponents component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=getcomponents--primary'));

  it('should render the component', () => {
    cy.get('h1').should('contain', 'Welcome to getComponents!');
  });
});
