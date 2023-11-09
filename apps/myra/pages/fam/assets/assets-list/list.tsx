import { ReactElement } from 'react';
import { AssetsList } from '@fam/assets';
import { AssetsSidebarLayout, FamLayout } from '@fam/layouts';

export const AssetsListPage = () => <AssetsList />;

AssetsListPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <FamLayout>
      <AssetsSidebarLayout>{page}</AssetsSidebarLayout>
    </FamLayout>
  );
};

export default AssetsListPage;
