describe('@myra-templates: ButtonListPopover component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=buttonlistpopover--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to ButtonListPopover!');
    });
});
