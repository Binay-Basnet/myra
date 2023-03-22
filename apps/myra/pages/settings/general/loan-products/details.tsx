import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { LoanProductDetail } from '@coop/cbs/settings/loan-product';
import { SettingsGeneralLayout } from '@coop/cbs/settings/ui-layout';

const LoanProductDetailsPage = () => <LoanProductDetail />;

LoanProductDetailsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <SettingsGeneralLayout>{page}</SettingsGeneralLayout>
    </MainLayout>
  );
};

export default LoanProductDetailsPage;
