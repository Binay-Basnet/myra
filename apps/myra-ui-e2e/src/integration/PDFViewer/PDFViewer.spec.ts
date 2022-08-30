describe('shared-ui: PDFViewer component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=pdfviewer--primary'));

  it('should render the component', () => {
    cy.get('h1').should('contain', 'Welcome to PDFViewer!');
  });
});
