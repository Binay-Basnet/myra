import { ReactElement } from 'react';

import { CBSLoanDetails, LoanDetailsHeader } from '@coop/cbs/loan/details';
import { LoanListLayout } from '@coop/cbs/loan/layouts';
import { MainLayout } from '@coop/shared/ui';

const LoanDetailsPage = () => (
  <>
    <LoanDetailsHeader title="Loan Application" />
    <CBSLoanDetails />
  </>
);

LoanDetailsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <LoanListLayout>{page}</LoanListLayout>{' '}
    </MainLayout>
  );
};

export default LoanDetailsPage;
