describe('@myra-forms: PhoneNumberInput component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=phonenumberinput--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to PhoneNumberInput!');
    });
});
