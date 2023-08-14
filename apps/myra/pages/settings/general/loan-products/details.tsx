import { ReactElement } from 'react';

import { LoanProductDetail } from '@coop/cbs/settings/loan-product';
import { SettingsGeneralLayout, SettingsLayout } from '@coop/cbs/settings/ui-layout';

const LoanProductDetailsPage = () => <LoanProductDetail />;

LoanProductDetailsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <SettingsLayout>
      <SettingsGeneralLayout>{page}</SettingsGeneralLayout>
    </SettingsLayout>
  );
};

export default LoanProductDetailsPage;
