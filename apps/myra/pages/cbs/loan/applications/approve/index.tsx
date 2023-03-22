import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { CBSLoanApprove } from '@coop/cbs/loan/details';
import { LoanListLayout } from '@coop/cbs/loan/layouts';

const ApproveLoan = () => <CBSLoanApprove />;

ApproveLoan.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <LoanListLayout>{page}</LoanListLayout>{' '}
    </MainLayout>
  );
};

export default ApproveLoan;
