import { ReactElement } from 'react';
import { AddAsset } from '@fam/assets';
import { FamLayout } from '@fam/layouts';

export const AddAssetPage = () => <AddAsset />;

AddAssetPage.getLayout = function getLayout(page: ReactElement) {
  return <FamLayout>{page}</FamLayout>;
};

export default AddAssetPage;
