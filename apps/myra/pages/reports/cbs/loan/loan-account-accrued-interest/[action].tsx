import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui/templates';

import { LoanAccountAccruedInterestReport } from '@coop/cbs/reports';

const LoanAccountAccruedInterest = () => <LoanAccountAccruedInterestReport />;
export default LoanAccountAccruedInterest;

LoanAccountAccruedInterest.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};
