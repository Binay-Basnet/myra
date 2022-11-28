import { ReactElement } from 'react';

import { LoanRepayment } from '@coop/cbs/loan/repayment';
import { MainLayout } from '@myra-ui';

const AddLoanRepayment = () => <LoanRepayment />;

export default AddLoanRepayment;

AddLoanRepayment.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
