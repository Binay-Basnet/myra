describe('myra-ui: TableListFilter component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=tablelistfilter--primary'));

    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to TableListFilter!');
    });
});
