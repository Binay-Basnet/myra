import { ReactElement } from 'react';
import { AddDisposal } from '@fam/feature-operation';
import { FamLayout } from '@fam/layouts';

export const AddDisposalPage = () => <AddDisposal />;

AddDisposalPage.getLayout = function getLayout(page: ReactElement) {
  return <FamLayout>{page}</FamLayout>;
};

export default AddDisposalPage;
