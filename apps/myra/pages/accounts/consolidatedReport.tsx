import { ReactElement } from 'react';

import { AccountLayout } from '@saccos/myra/ui';
import { ShareTable } from '@saccos/myra/components';

// TODO ( Update this page when design arrives )
const AccountConsolidatedPage = () => {
  return <ShareTable />;
};

AccountConsolidatedPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <AccountLayout headingText={'Account Consolidate Report'}>
      {page}
    </AccountLayout>
  );
};
export default AccountConsolidatedPage;
