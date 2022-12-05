describe('@myra-forms: SwitchTabs component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=switchtabs--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to SwitchTabs!');
    });
});
