import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { NewLoanApplication } from '@coop/cbs/loan';

const LoanApplicationPage = () => <NewLoanApplication />;

LoanApplicationPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};

export default LoanApplicationPage;
