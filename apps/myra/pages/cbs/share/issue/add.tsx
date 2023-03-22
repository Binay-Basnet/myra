import React from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { CbsShareFeaturesSharePurchase } from '@coop/cbs/share';

const SharePurchase = () => <CbsShareFeaturesSharePurchase />;

SharePurchase.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};

export default SharePurchase;
