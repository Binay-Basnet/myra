describe('myra-ui: FormInput component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=forminput--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to FormInput!');
    });
});
