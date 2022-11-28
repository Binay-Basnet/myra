import React from 'react';

import { CbsShareFeaturesSharePurchase } from '@coop/cbs/share';
import { MainLayout } from '@myra-ui';

const SharePurchase = () => <CbsShareFeaturesSharePurchase />;

SharePurchase.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default SharePurchase;
