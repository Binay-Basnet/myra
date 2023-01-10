import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { LoanDetailsHeader } from '@coop/cbs/loan/details';
import { LoanListLayout } from '@coop/cbs/loan/layouts';
import { CbsLoanFeatureLoanAccountDetail } from '@coop/loan/account-details';

const LoanDetailsPage = () => (
  <>
    <LoanDetailsHeader title="Loan Account List" />
    <CbsLoanFeatureLoanAccountDetail />
  </>
);

LoanDetailsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <LoanListLayout>{page}</LoanListLayout>
    </MainLayout>
  );
};

export default LoanDetailsPage;
