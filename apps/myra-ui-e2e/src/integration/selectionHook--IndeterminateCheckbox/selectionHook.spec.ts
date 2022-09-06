describe('shared-ui: IndeterminateCheckbox component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=indeterminatecheckbox--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to IndeterminateCheckbox!');
    });
});
