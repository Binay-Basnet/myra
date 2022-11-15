describe('myra-ui: TableAmountFilter component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=tableamountfilter--primary'));

  it('should render the component', () => {
    cy.get('h1').should('contain', 'Welcome to TableAmountFilter!');
  });
});
