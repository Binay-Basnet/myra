describe('@myra-templates: MainLayout component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=mainlayout--primary&args=children;'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to MainLayout!');
    });
});
