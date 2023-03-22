import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { LoanListLayout } from '@coop/cbs/loan/layouts';
import { LoanList } from '@coop/cbs/loan/lists';

const LoanApplicationListPage = () => <LoanList />;

LoanApplicationListPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <LoanListLayout>{page}</LoanListLayout>
    </MainLayout>
  );
};
export default LoanApplicationListPage;
