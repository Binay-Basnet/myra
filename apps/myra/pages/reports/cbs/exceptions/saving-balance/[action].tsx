import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { ExceptionSavingBalanceReport } from '@coop/cbs/reports';

export const SavingBalanceExceptionPage = () => <ExceptionSavingBalanceReport />;

export default SavingBalanceExceptionPage;

SavingBalanceExceptionPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};
