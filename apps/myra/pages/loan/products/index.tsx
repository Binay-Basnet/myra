import { ReactElement } from 'react';

import { LoanListLayout } from '@coop/cbs/loan/layouts';
import { LoanProductTable } from '@coop/cbs/settings//feature-loan';
import { MainLayout, TableListPageHeader } from '@coop/shared/ui';

const LoanRepayments = () => (
  <>
    <TableListPageHeader heading="Loan Products" />
    <LoanProductTable showActionButton={false} />
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
