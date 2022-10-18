import { ReactElement } from 'react';

import { LoanRepayment } from '@coop/cbs/loan/repayment';
import { MainLayout } from '@coop/shared/ui';

const LoanRepayments = () => <LoanRepayment />;

export default LoanRepayments;

LoanRepayments.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
