describe('myra-ui: Newfile component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=newfile--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to Newfile!');
    });
});
