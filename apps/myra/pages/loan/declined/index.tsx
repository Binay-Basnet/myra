import { ReactElement } from 'react';

import { LoanListLayout } from '@coop/cbs/loan/layouts';
import { DeclinedLoanList } from '@coop/cbs/loan/lists';
import { MainLayout } from '@coop/shared/ui';

const LoanDeclinedList = () => <DeclinedLoanList />;

export default LoanDeclinedList;

LoanDeclinedList.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <LoanListLayout>{page}</LoanListLayout>
    </MainLayout>
  );
};
