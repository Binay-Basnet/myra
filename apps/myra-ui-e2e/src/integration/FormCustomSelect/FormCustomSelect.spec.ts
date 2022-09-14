describe('shared-ui: FormCustomSelect component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=formcustomselect--primary&args=control;name;rules;'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to FormCustomSelect!');
    });
});
