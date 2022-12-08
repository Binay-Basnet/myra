describe('@myra-forms: Radio component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=radio--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to Radio!');
    });
});
