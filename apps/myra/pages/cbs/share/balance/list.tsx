import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { ShareBalanceTable, SharePageLayout } from '@coop/myra/components';

const ShareBalance = () => <ShareBalanceTable />;

ShareBalance.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <SharePageLayout>{page}</SharePageLayout>
    </MainLayout>
  );
};
export default ShareBalance;
