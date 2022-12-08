import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { LoanProductDetail } from '@coop/cbs/settings/loan-product';
import { DetailPathBar, SavingDetailPageSidebarLayout } from '@coop/cbs/settings/ui-layout';

const LoanProductDetailsPage = () => (
  <>
    <DetailPathBar title="Loan Product" />
    <LoanProductDetail />
  </>
);

LoanProductDetailsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <SavingDetailPageSidebarLayout>{page}</SavingDetailPageSidebarLayout>
    </MainLayout>
  );
};

export default LoanProductDetailsPage;
