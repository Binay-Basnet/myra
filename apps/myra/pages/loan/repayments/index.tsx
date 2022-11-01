import { ReactElement } from 'react';

import { LoanListLayout } from '@coop/cbs/loan/layouts';
import { CBSLoanRepaymentList } from '@coop/cbs/loan/repayment';
import { MainLayout } from '@coop/shared/ui';

const LoanRepayments = () => <CBSLoanRepaymentList />;

export default LoanRepayments;

LoanRepayments.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <LoanListLayout>{page}</LoanListLayout>
    </MainLayout>
  );
};
