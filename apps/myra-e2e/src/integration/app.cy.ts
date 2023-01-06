describe('myra', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit('/');
  });

  it('should display welcome message', () => {
    cy.visit('/login');
    // Custom command example, see `../support/commands.ts` file
    cy.get('[data-testid="username"]').type('admin');
    cy.get('[data-testid="password"]').type('admin');

    cy.contains('Log in').click({});
    cy.wait(5000);
    cy.contains('Core Banking Systems').click({ force: true });
    cy.get('[data-testid="new-member"]').click({ force: true });
    cy.contains('10002').click({ force: true });
  });
});
