import { ReactElement } from 'react';
import { AssetsTypeList } from '@fam/assets';
import { AssetsSidebarLayout, FamLayout } from '@fam/layouts';

export const AssetsTypeListPage = () => <AssetsTypeList />;

AssetsTypeListPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <FamLayout>
      <AssetsSidebarLayout>{page}</AssetsSidebarLayout>
    </FamLayout>
  );
};

export default AssetsTypeListPage;
