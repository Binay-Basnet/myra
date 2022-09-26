import { ReactElement } from 'react';

import { LoanListLayout } from '@coop/cbs/loan/layouts';
import { MainLayout, WIPState } from '@coop/shared/ui';

const LoanRepayments = () => <WIPState />;

export default LoanRepayments;

LoanRepayments.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <LoanListLayout>{page}</LoanListLayout>
    </MainLayout>
  );
};
