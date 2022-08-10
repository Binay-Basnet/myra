describe('shared-ui: PageHeaderWithTabs component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=pageheaderwithtabs--primary'));

  it('should render the component', () => {
    cy.get('h1').should('contain', 'Welcome to PageHeaderWithTabs!');
  });
});
