import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { LoanCloseForm } from '@coop/cbs/loan/close';

const AddLoanRepayment = () => <LoanCloseForm />;

export default AddLoanRepayment;

AddLoanRepayment.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>;
    </MainLayout>
  );
};
