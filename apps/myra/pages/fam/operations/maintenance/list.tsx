import { ReactElement } from 'react';
import { MaintenanceList } from '@fam/feature-operation';
import { FamLayout, OperationSidebarLayout } from '@fam/layouts';

export const MaintenanceListPage = () => <MaintenanceList />;

MaintenanceListPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <FamLayout>
      <OperationSidebarLayout>{page}</OperationSidebarLayout>
    </FamLayout>
  );
};

export default MaintenanceListPage;
