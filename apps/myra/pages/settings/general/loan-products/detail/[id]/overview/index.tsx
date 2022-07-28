import { ReactElement } from 'react';

import { LoanProductOverviewDetailPage } from '@coop/cbs/settings/deposit-products';
import {
  SettingsDetailPageLayout,
  SettingsGeneralLayout,
  SettingsLayout,
} from '@coop/cbs/settings/ui-layout';

const LoanProductDetailPage = () => {
  return <LoanProductOverviewDetailPage />;
};

LoanProductDetailPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <SettingsLayout>
      <SettingsGeneralLayout>
        <SettingsDetailPageLayout>{page}</SettingsDetailPageLayout>
      </SettingsGeneralLayout>
    </SettingsLayout>
  );
};
export default LoanProductDetailPage;
