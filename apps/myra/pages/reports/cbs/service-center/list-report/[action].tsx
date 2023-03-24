import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { ServiceCenterListReport } from '@coop/cbs/reports';

const NewShareStatementReport = () => <ServiceCenterListReport />;

export default NewShareStatementReport;

NewShareStatementReport.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};
