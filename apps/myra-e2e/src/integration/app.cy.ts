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
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(5000);
    cy.get('[data-testid="corebankingSystems"]').click({ force: true });
    cy.get('[data-testid="helpButton"]').click({ force: true });

    // cy.contains('Core Banking Systems').click({ force: true });
    cy.get('[data-testid="transactions-tab"]').click({ force: true });
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < 100; i++) {
      cy.get('[data-testid="New"]').click({ force: true });
      cy.get('[data-testid="New Journal Voucher"]').click({ force: true });
      cy.get('[data-testid="Search-Select"]').click({ force: true });
      cy.get(
        '[data-testid="Search-Select-80.1.1-cash in teller for suaysh(01gxqmqznr7y0399t44rvamyur) (naya)"]'
      ).click({ force: true });
      cy.get('[data-testid="deleteRow-0"]').click({ force: true });
      cy.get('[data-testid="Search-Select"]').click({ force: true });

      cy.get('[data-testid="Search-Select-80.1.2-cash in vault (naya)"]').click({ force: true });
      cy.get('[data-testid="Search-Select"]').click({ force: true });

      cy.get(
        '[data-testid="Search-Select-80.1.1-cash in teller for suaysh(01gxqmqznr7y0399t44rvamyur) (naya)"]'
      ).click({ force: true });

      cy.get('[data-testid="drAmount-0"]').type('100');
      cy.get('[data-testid="crAmount-1"]').type('100');
      cy.get('[data-testid="notes"]').type('Nilu Chilu');
      cy.get('[data-testid="Save"]').click({ force: true });
      cy.get('[data-testid="Done"]', { withinSubject: null }).click({ force: true });
    }

    // cy.get('[data-testid="memberId-01GXQSVQV3CQ27WQ82B40BINDI"]').click({ force: true });
    // cy.get('[data-testid="accountId"]').click({ force: true });
    // cy.get('[data-testid="accountId-REG0000000001"]').click({ force: true });
    // cy.get('[data-testid="voucherId"]').type('2121212');
    // cy.get('[data-testid="amount"]').type('15000');
    // cy.get('[data-testid="Proceed Transaction"]').click({ force: true });
    // cy.get('[data-testid="Bank Voucher"]').click({ force: true });
    // cy.get('[data-testid="bankVoucher.bankId"]').click({ force: true });
    // cy.get('[data-testid="bankVoucher.bankId-01H40QWBSYJDQT6N83EVPY2X04"]').click({
    //   force: true,
    // });
    // cy.get('[data-testid="bankVoucher.voucherId"]').type('21212123');

    // cy.get('[data-testid="bankVoucher.depositedAt"]').click({ force: true, multiple: true });

    // cy.get('[data-testid="bankVoucher.depositedAt-month"]').click({ force: true });
    // cy.get('[data-testid="bankVoucher.depositedAt-June"]').click({ force: true });

    // cy.get('[data-testid="bankVoucher.depositedAt-year"]').click({ force: true });
    // cy.get('[data-testid="bankVoucher.depositedAt-2023"]').click({ force: true });
    // cy.get('[data-testid="bankVoucher.depositedAt-2023-06-06"]').click({ force: true });
    // cy.get('[data-testid="bankVoucher.depositedBy"]').type('Nilu');
    // cy.get('[data-testid="Add New Deposit"]').click({ force: true });
    // cy.get('[data-testid="Done"]', { withinSubject: null }).click({ force: true });
    // }
  });
});
