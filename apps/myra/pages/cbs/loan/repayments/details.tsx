import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { LoanListLayout } from '@coop/cbs/loan/layouts';
import { LoanRepaymentDetailPage } from '@coop/cbs/transactions/feature-detail-page';
import { TransactionDetailPathBar } from '@coop/cbs/transactions/ui-components';

const LoanRepaymentDetailsPage = () => (
  <>
    <TransactionDetailPathBar title="Transaction List" />
    <LoanRepaymentDetailPage />
  </>
);

LoanRepaymentDetailsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <LoanListLayout>{page}</LoanListLayout>
    </MainLayout>
  );
};

export default LoanRepaymentDetailsPage;
