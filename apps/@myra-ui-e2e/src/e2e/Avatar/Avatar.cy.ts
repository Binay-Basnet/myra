describe('@myra-foundations: Avatar component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=avatar--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to Avatar!');
    });
});
