import { ReactElement } from 'react';

import { ShareBalanceTable, SharePageLayout } from '@coop/myra/components';
import { MainLayout } from '@coop/shared/ui';

const ShareBalance = () => <ShareBalanceTable />;

ShareBalance.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <SharePageLayout>{page}</SharePageLayout>
    </MainLayout>
  );
};
export default ShareBalance;
