import React from 'react';

import { CbsShareFeaturesShareReturn } from '@coop/cbs/share-return';
import { MainLayout } from '@myra-ui';

const ShareReturn = () => <CbsShareFeaturesShareReturn />;

ShareReturn.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default ShareReturn;
