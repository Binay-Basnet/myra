import { ShareBalanceTable,ShareLayout } from '@saccos/myra/components';
import { ReactElement } from 'react';

// TODO ( Update this page when design arrives )
const ShareBalance = () => {
  return <ShareBalanceTable />;
};

ShareBalance.getLayout = function getLayout(page: ReactElement) {
  return (
    <ShareLayout rows={false} headingText={'Share Balance'}>
      {page}
    </ShareLayout>
  );
};
export default ShareBalance;
