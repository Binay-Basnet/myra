describe('myra-ui: TextInput component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=textinput--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to TextInput!');
    });
});
