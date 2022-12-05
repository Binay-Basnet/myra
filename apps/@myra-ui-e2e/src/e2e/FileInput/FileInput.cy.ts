describe('@myra-forms: FileInput component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=fileinput--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to FileInput!');
    });
});
