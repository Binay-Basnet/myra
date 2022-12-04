describe('@myra-forms: NumberInput component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=numberinput--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to NumberInput!');
    });
});
