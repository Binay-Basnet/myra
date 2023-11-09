import { ReactElement } from 'react';
import { AddAssetType } from '@fam/assets';
import { FamLayout } from '@fam/layouts';

export const AddAssetTypePage = () => <AddAssetType />;

AddAssetTypePage.getLayout = function getLayout(page: ReactElement) {
  return <FamLayout>{page}</FamLayout>;
};

export default AddAssetTypePage;
