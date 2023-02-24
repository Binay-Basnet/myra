import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { ExceptionSavingBalanceReport } from '@coop/cbs/reports';

export const SavingBalanceExceptionPage = () => <ExceptionSavingBalanceReport />;

export default SavingBalanceExceptionPage;

SavingBalanceExceptionPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
