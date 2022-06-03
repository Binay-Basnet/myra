import { ReactElement } from 'react';
import { ShareBalanceTable, SharePageLayout } from '@saccos/myra/components';
import { MainLayout } from '@saccos/myra/ui';

// TODO ( Update this page when design arrives )
const ShareBalance = () => {
  return <ShareBalanceTable />;
};

ShareBalance.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <SharePageLayout>{page}</SharePageLayout>
    </MainLayout>
  );
};
export default ShareBalance;
