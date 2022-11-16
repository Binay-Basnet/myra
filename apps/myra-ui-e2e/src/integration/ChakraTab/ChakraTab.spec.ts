describe('myra-ui: ChakraTab component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=chakratab--primary'));

  it('should render the component', () => {
    cy.get('h1').should('contain', 'Welcome to ChakraTab!');
  });
});
