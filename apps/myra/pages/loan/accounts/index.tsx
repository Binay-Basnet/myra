import { ReactElement } from 'react';

import { LoanListLayout } from '@coop/cbs/loan/layouts';
import { LoanAccountList } from '@coop/cbs/loan/lists';
import { MainLayout } from '@myra-ui';

const LoanAccounts = () => <LoanAccountList />;

export default LoanAccounts;

LoanAccounts.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <LoanListLayout>{page}</LoanListLayout>
    </MainLayout>
  );
};
