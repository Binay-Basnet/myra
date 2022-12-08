import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { NewLoanApplication } from '@coop/cbs/loan';

const LoanApplicationPage = () => <NewLoanApplication />;

LoanApplicationPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default LoanApplicationPage;
