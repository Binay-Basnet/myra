import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { MarketRepresentativeCollectionList } from '@coop/cbs/others/feature-market-representative-collection';
import { OthersPageLayout } from '@coop/cbs/others/ui-layouts';

const MarketRepresentativeCollectionListPage = () => <MarketRepresentativeCollectionList />;

export default MarketRepresentativeCollectionListPage;

MarketRepresentativeCollectionListPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <OthersPageLayout>{page}</OthersPageLayout>
    </MainLayout>
  );
};
