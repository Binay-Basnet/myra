import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { ShareCertificatePrintReport } from '@coop/cbs/reports';

export const ShareCertificatePrintReportPage = () => <ShareCertificatePrintReport />;

export default ShareCertificatePrintReportPage;

ShareCertificatePrintReportPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};
