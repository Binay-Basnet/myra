describe('@myra-templates: FormHeader component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=formheader--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to FormHeader!');
    });
});
