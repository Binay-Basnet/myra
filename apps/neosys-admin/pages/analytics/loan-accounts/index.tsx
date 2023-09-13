import { ReactElement } from 'react';
import { LoanAccountList } from '@neosys/feature-analytics';

import { AnalyticsSiderbar, MainLayout } from '@coop/neosys-admin/layout';
// import { MainLayout } from '@coop/shared/ui';

const loanAccountsList = () => <LoanAccountList />;

loanAccountsList.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <AnalyticsSiderbar>{page}</AnalyticsSiderbar>
    </MainLayout>
  );
};
export default loanAccountsList;
