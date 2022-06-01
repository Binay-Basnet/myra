import { ReactElement } from 'react';
import { ShareBalanceTable, SharePageLayout } from '@saccos/myra/components';

// TODO ( Update this page when design arrives )
const ShareBalance = () => {
  return <ShareBalanceTable />;
};

ShareBalance.getLayout = function getLayout(page: ReactElement) {
  return (
    <SharePageLayout mainTitle="Share Balance" rows={[]}>
      {page}
    </SharePageLayout>
  );
};
export default ShareBalance;
