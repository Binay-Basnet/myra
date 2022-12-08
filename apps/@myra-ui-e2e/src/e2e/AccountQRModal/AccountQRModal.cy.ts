describe('@myra-components: AccountQRModal component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=accountqrmodal--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to AccountQRModal!');
    });
});
