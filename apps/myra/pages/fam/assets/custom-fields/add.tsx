import { ReactElement } from 'react';
import { AddCustomField } from '@fam/assets';
import { FamLayout } from '@fam/layouts';

export const AddCustomFieldPage = () => <AddCustomField />;

AddCustomFieldPage.getLayout = function getLayout(page: ReactElement) {
  return <FamLayout>{page}</FamLayout>;
};

export default AddCustomFieldPage;
