import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { Can } from '@coop/cbs/utils';
import { SharePageLayout, ShareRegisterTable } from '@coop/myra/components';

const ShareRegister = () => (
  <Can I="SHOW_IN_MENU" a="CBS_SHARE_SHARE_REGISTER" showError>
    <ShareRegisterTable />
  </Can>
);

ShareRegister.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <SharePageLayout>{page}</SharePageLayout>
    </MainLayout>
  );
};
export default ShareRegister;
