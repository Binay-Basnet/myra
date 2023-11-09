import { ReactElement } from 'react';
import { AddAssetGroup } from '@fam/assets';
import { FamLayout } from '@fam/layouts';

export const AddAssetGroupPage = () => <AddAssetGroup />;

AddAssetGroupPage.getLayout = function getLayout(page: ReactElement) {
  return <FamLayout>{page}</FamLayout>;
};

export default AddAssetGroupPage;
