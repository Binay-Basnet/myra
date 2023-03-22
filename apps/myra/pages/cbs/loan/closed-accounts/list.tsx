import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { LoanListLayout } from '@coop/cbs/loan/layouts';
import { ClosedLoanList } from '@coop/cbs/loan/lists';

const LoanClosedList = () => <ClosedLoanList />;

LoanClosedList.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <LoanListLayout>{page}</LoanListLayout>
    </MainLayout>
  );
};
export default LoanClosedList;
