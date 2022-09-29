import { ReactElement } from 'react';

import { LoanAccountList } from '@coop/cbs/loan/details';
import { LoanListLayout } from '@coop/cbs/loan/layouts';
import { MainLayout } from '@coop/shared/ui';

const LoanAccounts = () => <LoanAccountList />;

export default LoanAccounts;

LoanAccounts.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <LoanListLayout>{page}</LoanListLayout>
    </MainLayout>
  );
};
