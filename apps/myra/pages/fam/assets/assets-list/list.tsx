import { ReactElement } from 'react';
import { FamModuleFeatureAssets } from '@fam/assets';
import { AssetsSidebarLayout, FamLayout } from '@fam/layouts';

export const AssetsListPage = () => <FamModuleFeatureAssets />;

AssetsListPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <FamLayout>
      <AssetsSidebarLayout>{page}</AssetsSidebarLayout>
    </FamLayout>
  );
};

export default AssetsListPage;
