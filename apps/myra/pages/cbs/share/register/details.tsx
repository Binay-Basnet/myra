import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { SharePageLayout } from '@coop/myra/components';
import { CbsShareFeatureShareRegisterDetail } from '@coop/share/register/detail';

const ShareRegisterDetail = () => <CbsShareFeatureShareRegisterDetail />;

ShareRegisterDetail.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <SharePageLayout>{page}</SharePageLayout>
    </MainLayout>
  );
};
export default ShareRegisterDetail;
