import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { LoanRepayment } from '@coop/cbs/loan/repayment';

const AddLoanRepayment = () => <LoanRepayment />;

export default AddLoanRepayment;

AddLoanRepayment.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
