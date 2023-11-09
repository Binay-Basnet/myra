import { ReactElement } from 'react';
import { AddAssetAssign } from '@fam/feature-operation';
import { FamLayout } from '@fam/layouts';

export const AddAssetAssignPage = () => <AddAssetAssign />;

AddAssetAssignPage.getLayout = function getLayout(page: ReactElement) {
  return <FamLayout>{page}</FamLayout>;
};

export default AddAssetAssignPage;
