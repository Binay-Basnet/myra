describe('@myra-components: GlTransactionJornalVoucherPrint component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=gltransactionjornalvoucherprint--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to GlTransactionJornalVoucherPrint!');
    });
});
