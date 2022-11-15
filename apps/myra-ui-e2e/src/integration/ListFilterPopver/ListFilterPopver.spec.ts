describe('myra-ui: ListFilterPopover component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=listfilterpopover--primary'));

  it('should render the component', () => {
    cy.get('h1').should('contain', 'Welcome to ListFilterPopover!');
  });
});
