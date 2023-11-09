import { ReactElement } from 'react';
import { AddMaintenance } from '@fam/feature-operation';
import { FamLayout } from '@fam/layouts';

export const AddMaintenancePage = () => <AddMaintenance />;

AddMaintenancePage.getLayout = function getLayout(page: ReactElement) {
  return <FamLayout>{page}</FamLayout>;
};

export default AddMaintenancePage;
