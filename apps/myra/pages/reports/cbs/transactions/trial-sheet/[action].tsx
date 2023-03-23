import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { TrialSheetReport } from '@coop/cbs/reports';

const NewShareStatementReport = () => <TrialSheetReport />;

export default NewShareStatementReport;

NewShareStatementReport.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};
