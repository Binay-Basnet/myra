describe('myra-ui: TextAreaInput component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=textareainput--primary'));

  it('should render the component', () => {
    cy.get('h1').should('contain', 'Welcome to TextAreaInput!');
  });
});
