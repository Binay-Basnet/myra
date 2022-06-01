describe('myra-ui: RadioButton component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=radiobutton--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to RadioButton!');
    });
});
