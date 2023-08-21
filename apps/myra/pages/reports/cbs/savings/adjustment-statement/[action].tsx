import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { AdjustmentSavingStatementReport } from '@coop/cbs/reports';

export const AdjustmentSavingStatementPage = () => <AdjustmentSavingStatementReport />;

export default AdjustmentSavingStatementPage;

AdjustmentSavingStatementPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};
