import { ReactElement } from 'react';
import { PurchaseEntryList } from '@fam/feature-purchase';
import { FamLayout, PurchaseSidebarLayout } from '@fam/layouts';

export const PurchaseEntryListPage = () => <PurchaseEntryList />;

PurchaseEntryListPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <FamLayout>
      <PurchaseSidebarLayout>{page}</PurchaseSidebarLayout>
    </FamLayout>
  );
};

export default PurchaseEntryListPage;
