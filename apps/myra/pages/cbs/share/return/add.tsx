import React from 'react';

import { MainLayout } from '@myra-ui';

import { CbsShareFeaturesShareReturn } from '@coop/cbs/share-return';

const ShareReturn = () => <CbsShareFeaturesShareReturn />;

ShareReturn.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default ShareReturn;
