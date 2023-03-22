import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { LoanListLayout } from '@coop/cbs/loan/layouts';
import { DeclinedLoanList } from '@coop/cbs/loan/lists';

const LoanDeclinedList = () => <DeclinedLoanList />;

export default LoanDeclinedList;

LoanDeclinedList.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <LoanListLayout>{page}</LoanListLayout>
    </MainLayout>
  );
};
