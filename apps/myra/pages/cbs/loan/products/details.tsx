import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { LoanListLayout } from '@coop/cbs/loan/layouts';
import { LoanProductDetail } from '@coop/cbs/settings/loan-product';

const LoanProductDetailsPage = () => <LoanProductDetail />;

LoanProductDetailsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <LoanListLayout>{page}</LoanListLayout>
    </MainLayout>
  );
};

export default LoanProductDetailsPage;
