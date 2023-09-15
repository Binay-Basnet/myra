import { ReactElement } from 'react';
import { UserList } from '@neosys/feature-analytics';

import { AnalyticsSiderbar, MainLayout } from '@coop/neosys-admin/layout';
// import { MainLayout } from '@coop/shared/ui';

const UsersListPage = () => <UserList />;

UsersListPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <AnalyticsSiderbar>{page}</AnalyticsSiderbar>
    </MainLayout>
  );
};
export default UsersListPage;
