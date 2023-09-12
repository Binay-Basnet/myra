import { ReactElement } from 'react';

import { AnalyticsSiderbar, MainLayout } from '@coop/neosys-admin/layout';
// import { MainLayout } from '@coop/shared/ui';

const loanAccountsList = () => <>Member ledger counter list</>;

loanAccountsList.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <AnalyticsSiderbar>{page}</AnalyticsSiderbar>
    </MainLayout>
  );
};
export default loanAccountsList;
