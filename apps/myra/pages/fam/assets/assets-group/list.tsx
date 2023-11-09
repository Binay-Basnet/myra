import { ReactElement } from 'react';
import { AssetGroupList } from '@fam/assets';
import { AssetsSidebarLayout, FamLayout } from '@fam/layouts';

export const AssetsGroupListPage = () => <AssetGroupList />;

AssetsGroupListPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <FamLayout>
      <AssetsSidebarLayout>{page}</AssetsSidebarLayout>
    </FamLayout>
  );
};

export default AssetsGroupListPage;
