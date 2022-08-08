import React from 'react';

import { CbsShareFeaturesSharePurchase } from '@coop/cbs/share';
import { MainLayout } from '@coop/shared/ui';

const SharePurchase = () => {
  return <CbsShareFeaturesSharePurchase />;
};

SharePurchase.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default SharePurchase;
