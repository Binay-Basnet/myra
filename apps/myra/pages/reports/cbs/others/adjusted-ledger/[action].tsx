import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { AdjustedLedgersReport } from '@coop/cbs/reports';

export const AdjustedLedgersPage = () => <AdjustedLedgersReport />;

export default AdjustedLedgersPage;

AdjustedLedgersPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};
