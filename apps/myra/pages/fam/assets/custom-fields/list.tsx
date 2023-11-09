import { ReactElement } from 'react';
import { CustomFieldList } from '@fam/assets';
import { AssetsSidebarLayout, FamLayout } from '@fam/layouts';

export const CustomFieldsListPage = () => <CustomFieldList />;

CustomFieldsListPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <FamLayout>
      <AssetsSidebarLayout>{page}</AssetsSidebarLayout>
    </FamLayout>
  );
};

export default CustomFieldsListPage;
