import { ReactElement } from 'react';

import { LoanListLayout } from '@coop/cbs/loan/layouts';
import { LoanList } from '@coop/cbs/loan/lists';
import { MainLayout } from '@coop/shared/ui';

const LoanApplicationListPage = () => <LoanList />;

LoanApplicationListPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <LoanListLayout>{page}</LoanListLayout>
    </MainLayout>
  );
};
export default LoanApplicationListPage;
