describe('@myra-forms: AccountInput component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=accountinput--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to AccountInput!');
    });
});
