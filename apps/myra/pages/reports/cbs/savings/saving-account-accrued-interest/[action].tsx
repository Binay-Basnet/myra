import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui/templates';

import { SavingAccountAccruedInterestReport } from '@coop/cbs/reports';

const SavingAccountAccruedInterest = () => <SavingAccountAccruedInterestReport />;
export default SavingAccountAccruedInterest;

SavingAccountAccruedInterest.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};
