describe('shared-ui: SelectPopout component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=selectpopout--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to SelectPopout!');
    });
});
