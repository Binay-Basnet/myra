describe('myra-ui: TextFields component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=textfields--primary'));

  it('should render the component', () => {
    cy.get('h1').should('contain', 'Welcome to TextFields!');
  });
});
