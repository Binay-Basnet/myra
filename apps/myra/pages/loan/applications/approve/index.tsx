import { ReactElement } from 'react';

import { CBSLoanApprove } from '@coop/cbs/loan/details';
import { LoanListLayout } from '@coop/cbs/loan/layouts';
import { MainLayout } from '@coop/shared/ui';

const ApproveLoan = () => <CBSLoanApprove />;

ApproveLoan.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <LoanListLayout>{page}</LoanListLayout>{' '}
    </MainLayout>
  );
};

export default ApproveLoan;
