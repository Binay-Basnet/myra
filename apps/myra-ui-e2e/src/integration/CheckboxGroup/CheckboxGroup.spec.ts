describe('myra-ui: CheckboxGroup component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=checkboxgroup--primary'));

  it('should render the component', () => {
    cy.get('h1').should('contain', 'Welcome to CheckboxGroup!');
  });
});
