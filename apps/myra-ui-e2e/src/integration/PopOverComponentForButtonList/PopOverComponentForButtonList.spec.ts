describe('shared-ui: PopOverComponentForButtonList component', () => {
  beforeEach(() =>
    cy.visit('/iframe.html?id=popovercomponentforbuttonlist--primary')
  );

  it('should render the component', () => {
    cy.get('h1').should('contain', 'Welcome to PopOverComponentForButtonList!');
  });
});
