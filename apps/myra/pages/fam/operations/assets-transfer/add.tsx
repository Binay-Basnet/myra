import { ReactElement } from 'react';
import { AddAssetTransfer } from '@fam/feature-operation';
import { FamLayout } from '@fam/layouts';

export const AddAssetTransferPage = () => <AddAssetTransfer />;

AddAssetTransferPage.getLayout = function getLayout(page: ReactElement) {
  return <FamLayout>{page}</FamLayout>;
};

export default AddAssetTransferPage;
