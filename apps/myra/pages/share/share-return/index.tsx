import React from 'react';

import { CbsShareFeaturesShareReturn } from '@coop/cbs/share-return';
import { MainLayout } from '@coop/shared/ui';

const ShareReturn = () => {
  return <CbsShareFeaturesShareReturn />;
};

ShareReturn.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default ShareReturn;
