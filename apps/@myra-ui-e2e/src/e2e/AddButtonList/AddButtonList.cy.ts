describe('@myra-components: AddButtonList component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=addbuttonlist--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to AddButtonList!');
    });
});
