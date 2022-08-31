describe('shared-ui: ChakraModal component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=chakramodal--primary'));

  it('should render the component', () => {
    cy.get('h1').should('contain', 'Welcome to ChakraModal!');
  });
});
