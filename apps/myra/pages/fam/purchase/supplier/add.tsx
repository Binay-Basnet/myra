import { ReactElement } from 'react';
import { AddSupplier } from '@fam/feature-purchase';
import { FamLayout } from '@fam/layouts';

export const AddSupplierPage = () => <AddSupplier />;

AddSupplierPage.getLayout = function getLayout(page: ReactElement) {
  return <FamLayout>{page}</FamLayout>;
};

export default AddSupplierPage;
