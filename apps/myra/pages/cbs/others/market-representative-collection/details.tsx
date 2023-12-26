import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { MRCollectionDetail } from '@coop/cbs/others/feature-market-representative-collection';

const MarketRepresentativeCollectionDetailPage = () => <MRCollectionDetail />;

export default MarketRepresentativeCollectionDetailPage;

MarketRepresentativeCollectionDetailPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};
