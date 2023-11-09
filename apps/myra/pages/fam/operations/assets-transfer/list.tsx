import { ReactElement } from 'react';
import { AssetsTransferList } from '@fam/feature-operation';
import { FamLayout, OperationSidebarLayout } from '@fam/layouts';

export const AssetsTransferPage = () => <AssetsTransferList />;

AssetsTransferPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <FamLayout>
      <OperationSidebarLayout>{page}</OperationSidebarLayout>
    </FamLayout>
  );
};

export default AssetsTransferPage;
