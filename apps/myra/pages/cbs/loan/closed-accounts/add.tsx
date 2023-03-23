import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { LoanCloseForm } from '@coop/cbs/loan/close';

const AddLoanRepayment = () => <LoanCloseForm />;

export default AddLoanRepayment;

AddLoanRepayment.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
