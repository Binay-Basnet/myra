describe('myra-ui: Tags component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=tags--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to Tags!');
    });
});
