import { ReactElement } from 'react';

import { MainLayout, PageHeader } from '@myra-ui';

import { LoanListLayout } from '@coop/cbs/loan/layouts';
import { LoanProductTable } from '@coop/cbs/settings//feature-loan';

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
