import { ReactElement } from 'react';
import { SupplierList } from '@fam/feature-purchase';
import { FamLayout, PurchaseSidebarLayout } from '@fam/layouts';

export const SupplierListPage = () => <SupplierList />;

SupplierListPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <FamLayout>
      <PurchaseSidebarLayout>{page}</PurchaseSidebarLayout>
    </FamLayout>
  );
};

export default SupplierListPage;
