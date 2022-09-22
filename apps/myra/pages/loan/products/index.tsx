import { ReactElement } from 'react';

import { LoanProductTable } from '@coop/cbs/settings//feature-loan';
import { LoanListLayout } from '@coop/myra/components';
import { MainLayout, TableListPageHeader } from '@coop/shared/ui';

const LoanRepayments = () => (
  <>
    <TableListPageHeader heading="Loan Products" />
    <LoanProductTable />
  </>
);

export default LoanRepayments;

LoanRepayments.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <LoanListLayout>{page}</LoanListLayout>
    </MainLayout>
  );
};
