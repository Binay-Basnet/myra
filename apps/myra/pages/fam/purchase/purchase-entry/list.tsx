import { ReactElement } from 'react';
import { FamModuleFeatureAssets } from '@fam/assets';
import { FamLayout, PurchaseSidebarLayout } from '@fam/layouts';

export const PurchaseEntryPage = () => <FamModuleFeatureAssets />;

PurchaseEntryPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <FamLayout>
      <PurchaseSidebarLayout>{page}</PurchaseSidebarLayout>
    </FamLayout>
  );
};

export default PurchaseEntryPage;
