import { ReactElement } from 'react';

import { MainLayout, UtilitySidebarLayout } from '@coop/neosys-admin/layout';
import { UtilityClientBalanceList } from '@coop/neosys-admin/utility';

const UtilityClientBalancePage = () => <UtilityClientBalanceList />;

UtilityClientBalancePage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <UtilitySidebarLayout>{page}</UtilitySidebarLayout>
    </MainLayout>
  );
};

export default UtilityClientBalancePage;
