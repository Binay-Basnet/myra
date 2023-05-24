import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { MarketRepresentativeTransactionReport } from '@coop/cbs/reports';

const MRTransactionReportPage = () => <MarketRepresentativeTransactionReport />;

export default MRTransactionReportPage;

MRTransactionReportPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};
