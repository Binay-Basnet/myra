import { ReactElement } from 'react';

import { LoanListLayout } from '@coop/myra/components';
import { MainLayout, WIPState } from '@coop/shared/ui';

const LoanAccounts = () => <WIPState />;

export default LoanAccounts;

LoanAccounts.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <LoanListLayout>{page}</LoanListLayout>
    </MainLayout>
  );
};
