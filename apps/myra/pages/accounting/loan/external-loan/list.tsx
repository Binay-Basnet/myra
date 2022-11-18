import { ReactElement } from 'react';

import { AccountingLayout, ExternalLoanSidebarLayout } from '@coop/accounting/ui-layouts';
import { ExternalLoansList } from '@coop/accouting/loan';

const LoanList = () => <ExternalLoansList />;

LoanList.getLayout = function getLayout(page: ReactElement) {
  return (
    <AccountingLayout>
      <ExternalLoanSidebarLayout>{page}</ExternalLoanSidebarLayout>{' '}
    </AccountingLayout>
  );
};
export default LoanList;
