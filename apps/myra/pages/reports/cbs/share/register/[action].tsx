import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { ShareRegisterReport } from '@coop/cbs/reports';

const NewShareStatementReport = () => <ShareRegisterReport />;

export default NewShareStatementReport;

NewShareStatementReport.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};
