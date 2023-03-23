import React from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { CbsShareFeaturesShareReturn } from '@coop/cbs/share-return';

const ShareReturn = () => <CbsShareFeaturesShareReturn />;

ShareReturn.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};

export default ShareReturn;
