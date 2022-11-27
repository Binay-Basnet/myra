import { ReactElement } from 'react';

import { NewLoanApplication } from '@coop/cbs/loan';
import { MainLayout } from '@myra-ui';

const LoanApplicationPage = () => <NewLoanApplication />;

LoanApplicationPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default LoanApplicationPage;
