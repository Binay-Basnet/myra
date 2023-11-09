import { ReactElement } from 'react';
import { AddPurchaseEntry } from '@fam/feature-purchase';
import { FamLayout } from '@fam/layouts';

export const AddPurchaseEntryPage = () => <AddPurchaseEntry />;

AddPurchaseEntryPage.getLayout = function getLayout(page: ReactElement) {
  return <FamLayout>{page}</FamLayout>;
};

export default AddPurchaseEntryPage;
