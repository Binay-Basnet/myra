import { ReactElement } from 'react';

import { AccountLayout } from '@saccos/myra/ui';
import { MemberTable } from '@saccos/myra/components';

// TODO ( Update this page when design arrives )
const AccountConsolidatedPage = () => {
  return <MemberTable />;
};

AccountConsolidatedPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <AccountLayout headingText={'Account Consolidate Report'}>
      {page}
    </AccountLayout>
  );
};
export default AccountConsolidatedPage;
