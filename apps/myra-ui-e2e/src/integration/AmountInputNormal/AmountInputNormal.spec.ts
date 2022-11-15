describe('myra-ui: AmountInputNormal component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=amountinputnormal--primary'));

  it('should render the component', () => {
    cy.get('h1').should('contain', 'Welcome to AmountInputNormal!');
  });
});
