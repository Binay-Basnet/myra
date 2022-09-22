import { ReactElement } from 'react';

import { LoanListLayout } from '@coop/myra/components';
import { MainLayout, WIPState } from '@coop/shared/ui';

const LoanDeclinedList = () => <WIPState />;

export default LoanDeclinedList;

LoanDeclinedList.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <LoanListLayout>{page}</LoanListLayout>
    </MainLayout>
  );
};
