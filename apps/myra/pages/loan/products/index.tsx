import { ReactElement } from 'react';

import { MainLayout, PageHeader } from '@myra-ui';

import { LoanListLayout } from '@coop/cbs/loan/layouts';
import { LoanProductTable } from '@coop/cbs/settings//feature-loan';
import { featureCode } from '@coop/shared/utils';

const LoanRepayments = () => (
  <>
    <PageHeader heading={`Loan Products - ${featureCode.loanProducts}`} />
    <LoanProductTable showSettingsAction={false} />
  </>
);

export default LoanRepayments;

LoanRepayments.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <LoanListLayout>{page}</LoanListLayout>
    </MainLayout>
  );
};
