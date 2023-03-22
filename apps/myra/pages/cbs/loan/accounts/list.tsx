import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { LoanListLayout } from '@coop/cbs/loan/layouts';
import { LoanAccountList } from '@coop/cbs/loan/lists';

const LoanAccounts = () => <LoanAccountList />;

export default LoanAccounts;

LoanAccounts.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <LoanListLayout>{page}</LoanListLayout>
    </MainLayout>
  );
};
