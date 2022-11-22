import { ReactElement } from 'react';

import { AccountingLayout, ExternalLoanSidebarLayout } from '@coop/accounting/ui-layouts';
import { ExternalLoanAccountList } from '@coop/accouting/loan';

const LoanList = () => <ExternalLoanAccountList />;

LoanList.getLayout = function getLayout(page: ReactElement) {
  return (
    <AccountingLayout>
      <ExternalLoanSidebarLayout>{page}</ExternalLoanSidebarLayout>{' '}
    </AccountingLayout>
  );
};
export default LoanList;
