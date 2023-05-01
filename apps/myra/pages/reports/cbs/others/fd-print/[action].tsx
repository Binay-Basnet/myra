import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { FDCertificatePrintReport } from '@coop/cbs/reports';

export const FDCertificatePrintPage = () => <FDCertificatePrintReport />;

export default FDCertificatePrintPage;

FDCertificatePrintPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};
