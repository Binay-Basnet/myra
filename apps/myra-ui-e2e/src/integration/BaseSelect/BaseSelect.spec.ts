describe('myra-ui: BaseSelect component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=baseselect--primary&args=options;variant;'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to BaseSelect!');
    });
});
