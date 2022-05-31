import { ReactElement } from 'react';
import { AccountLayout, ShareTable } from '@saccos/myra/components';

import { useMembersQuery } from '../../generated/graphql';

// TODO ( Update this page when design arrives )
const AccountConsolidatedPage = () => {
  const { data, isLoading } = useMembersQuery();

  return <ShareTable data={data} isLoading={isLoading} />;
};

AccountConsolidatedPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <AccountLayout headingText={'Account Consolidate Report'}>
      {page}
    </AccountLayout>
  );
};
export default AccountConsolidatedPage;
