describe('shared-ui: SidebarTabs component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=sidebartabs--primary'));

  it('should render the component', () => {
    cy.get('h1').should('contain', 'Welcome to SidebarTabs!');
  });
});
