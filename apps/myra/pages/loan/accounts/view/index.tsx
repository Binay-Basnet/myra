import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { CBSLoanDetails, LoanDetailsHeader } from '@coop/cbs/loan/details';
import { LoanListLayout } from '@coop/cbs/loan/layouts';

const LoanDetailsPage = () => (
  <>
    <LoanDetailsHeader title="Loan Account List" />
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
