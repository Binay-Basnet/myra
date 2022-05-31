import { ReactElement } from 'react';
import { AccountLayout, ShareTable } from '@saccos/myra/components';

import { useMembersQuery } from '../../generated/graphql';

// TODO ( Update this page when design arrives )
const AccountCertificatePrint = () => {
  const { data, isLoading } = useMembersQuery();

  return <ShareTable data={data} isLoading={isLoading} />;
};

AccountCertificatePrint.getLayout = function getLayout(page: ReactElement) {
  return (
    <AccountLayout headingText={'Account Certificate'}>{page}</AccountLayout>
  );
};
export default AccountCertificatePrint;
