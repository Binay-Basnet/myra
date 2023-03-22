import { ReactElement } from 'react';

import { ServiceCenterListReport } from '@coop/cbs/reports';
import { MainLayout, Scrollable } from '@myra-ui';

const NewShareStatementReport = () => <ServiceCenterListReport />;

export default NewShareStatementReport;

NewShareStatementReport.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};
