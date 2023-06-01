import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { MarketRepresentativeCollectionAdd } from '@coop/cbs/others/feature-market-representative-collection';

const MarketRepresentativeCollectionAddPage = () => <MarketRepresentativeCollectionAdd />;

export default MarketRepresentativeCollectionAddPage;

MarketRepresentativeCollectionAddPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};
