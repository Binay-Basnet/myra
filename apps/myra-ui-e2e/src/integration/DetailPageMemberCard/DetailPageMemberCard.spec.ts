describe('shared-ui: DetailPageMemberCard component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=detailpagemembercard--primary'));

  it('should render the component', () => {
    cy.get('h1').should('contain', 'Welcome to DetailPageMemberCard!');
  });
});
