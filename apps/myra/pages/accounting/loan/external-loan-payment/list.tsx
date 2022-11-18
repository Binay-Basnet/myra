import { ReactElement } from 'react';

import { AccountingLayout, ExternalLoanSidebarLayout } from '@coop/accounting/ui-layouts';
import { ExternalLoanPaymentList } from '@coop/accouting/loan';

const LoanList = () => <ExternalLoanPaymentList />;

LoanList.getLayout = function getLayout(page: ReactElement) {
  return (
    <AccountingLayout>
      <ExternalLoanSidebarLayout>{page}</ExternalLoanSidebarLayout>{' '}
    </AccountingLayout>
  );
};
export default LoanList;
