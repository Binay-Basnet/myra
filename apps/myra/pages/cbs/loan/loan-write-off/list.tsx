import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { LoanListLayout } from '@coop/cbs/loan/layouts';
import { LoanWriteOffList } from '@coop/cbs/loan/lists';

const LoanApplicationListPage = () => <LoanWriteOffList />;

LoanApplicationListPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <LoanListLayout>{page}</LoanListLayout>
    </MainLayout>
  );
};
export default LoanApplicationListPage;
