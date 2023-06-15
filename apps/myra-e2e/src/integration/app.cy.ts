describe('myra', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit('/');
  });

  it('should display welcome message', () => {
    cy.visit('/login');
    // Custom command example, see `../support/commands.ts` file
    cy.get('[data-testid="username"]').type('mpranab7890@gmail.com');
    cy.get('[data-testid="password"]').type('neosys@123');

    cy.contains('Log in').click({});
    cy.wait(5000);
    cy.contains('Core Banking Systems').click({ force: true });
    cy.get('[data-testid="new"]').click({ force: true });
    cy.get('[data-testid="New Individual"]').click({ force: true });
    cy.get('[data-testid="genderId"]').click({ force: true, multiple: true });
    cy.get('[data-testid="genderId-male"]').click({ force: true });

    cy.get('[data-testid="dateOfBirth"]').click({ force: true, multiple: true });
    cy.get('[data-testid="dateOfBirth-month"]').click({ force: true });
    cy.get('[data-testid="dateOfBirth-June"]').click({ force: true });

    cy.get('[data-testid="dateOfBirth-year"]').click({ force: true });
    cy.get('[data-testid="dateOfBirth-2002"]').click({ force: true });
    cy.get('[data-testid="dateOfBirth-2002-06-06"]').click({ force: true });
  });
});
