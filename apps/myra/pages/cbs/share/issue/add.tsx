import React from 'react';

import { MainLayout } from '@myra-ui';

import { CbsShareFeaturesSharePurchase } from '@coop/cbs/share';

const SharePurchase = () => <CbsShareFeaturesSharePurchase />;

SharePurchase.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default SharePurchase;
