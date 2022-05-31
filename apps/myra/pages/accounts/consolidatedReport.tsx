import { AccountLayout, ShareTable } from '@saccos/myra/components';
import { ReactElement } from 'react';

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
