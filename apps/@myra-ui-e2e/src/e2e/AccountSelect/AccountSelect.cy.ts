describe('@myra-forms: AccountSelect component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=accountselect--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to AccountSelect!');
    });
});
