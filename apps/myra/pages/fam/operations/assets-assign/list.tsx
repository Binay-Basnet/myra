import { ReactElement } from 'react';
import { AssetsAssignList } from '@fam/feature-operation';
import { FamLayout, OperationSidebarLayout } from '@fam/layouts';

export const AssetsAssignListPage = () => <AssetsAssignList />;

AssetsAssignListPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <FamLayout>
      <OperationSidebarLayout>{page}</OperationSidebarLayout>
    </FamLayout>
  );
};

export default AssetsAssignListPage;
