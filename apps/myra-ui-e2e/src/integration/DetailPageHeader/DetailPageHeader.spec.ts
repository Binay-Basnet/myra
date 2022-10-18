describe('shared-ui: DetailPageHeader component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=detailpageheader--primary'));

  it('should render the component', () => {
    cy.get('h1').should('contain', 'Welcome to DetailPageHeader!');
  });
});
