import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { AddLoanLossProvision } from '@coop/cbs/loan/loan-loss-provision';

const LoanLossProvisionAddPage = () => <AddLoanLossProvision />;

export default LoanLossProvisionAddPage;

LoanLossProvisionAddPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
