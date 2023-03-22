import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { LoanListLayout } from '@coop/cbs/loan/layouts';
import { CBSLoanRepaymentList } from '@coop/cbs/loan/repayment';

const LoanRepayments = () => <CBSLoanRepaymentList />;

export default LoanRepayments;

LoanRepayments.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <LoanListLayout>{page}</LoanListLayout>
    </MainLayout>
  );
};
