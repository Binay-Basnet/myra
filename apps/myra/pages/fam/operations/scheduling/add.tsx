import { ReactElement } from 'react';
import { AddScheduling } from '@fam/feature-operation';
import { FamLayout } from '@fam/layouts';

export const AddSchedulingPage = () => <AddScheduling />;

AddSchedulingPage.getLayout = function getLayout(page: ReactElement) {
  return <FamLayout>{page}</FamLayout>;
};

export default AddSchedulingPage;
