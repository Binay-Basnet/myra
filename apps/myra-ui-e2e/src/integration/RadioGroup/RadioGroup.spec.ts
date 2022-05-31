describe('myra-ui: RadioGroup component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=radiogroup--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to RadioGroup!');
    });
});
