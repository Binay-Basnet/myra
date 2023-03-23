import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { LoanRepayment } from '@coop/cbs/loan/repayment';

const AddLoanRepayment = () => <LoanRepayment />;

export default AddLoanRepayment;

AddLoanRepayment.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};
