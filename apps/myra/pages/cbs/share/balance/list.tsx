import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { Can } from '@coop/cbs/utils';
import { ShareBalanceTable, SharePageLayout } from '@coop/myra/components';

const ShareBalance = () => (
  <Can I="SHOW_IN_MENU" a="CBS_SHARE_SHARE_BALANCE" showError>
    <ShareBalanceTable />
  </Can>
);

ShareBalance.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <SharePageLayout>{page}</SharePageLayout>
    </MainLayout>
  );
};
export default ShareBalance;
