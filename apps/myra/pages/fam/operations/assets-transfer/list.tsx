import { ReactElement } from 'react';
import { FamModuleFeatureAssets } from '@fam/assets';
import { FamLayout, OperationSidebarLayout } from '@fam/layouts';

export const AssetsTransferPage = () => <FamModuleFeatureAssets />;

AssetsTransferPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <FamLayout>
      <OperationSidebarLayout>{page}</OperationSidebarLayout>
    </FamLayout>
  );
};

export default AssetsTransferPage;
