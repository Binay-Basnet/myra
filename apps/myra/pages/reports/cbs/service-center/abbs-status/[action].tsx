import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { ABBSStatusReport } from '@coop/cbs/reports';

const NewShareStatementReport = () => <ABBSStatusReport />;

export default NewShareStatementReport;

NewShareStatementReport.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};
