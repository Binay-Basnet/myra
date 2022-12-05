import { ReactElement } from 'react';

import { LoanListLayout } from '@coop/cbs/loan/layouts';
import { LoanProductTable } from '@coop/cbs/settings//feature-loan';
import { MainLayout, PageHeader } from '@myra-ui';

const LoanRepayments = () => (
  <>
    <PageHeader heading="Loan Products" />
    <LoanProductTable showSettingsAction={false} />
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
