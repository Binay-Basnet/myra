import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { BalanceSheetReport } from '@coop/cbs/reports';

const NewShareStatementReport = () => <BalanceSheetReport />;

export default NewShareStatementReport;

NewShareStatementReport.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};
