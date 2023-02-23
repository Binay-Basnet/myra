import { ReactElement } from 'react';
import { useRouter } from 'next/router';

import { MainLayout } from '@myra-ui';

import { AccountDetails } from '@coop/cbs/accounts/account-form';
import { TransactionsSidebarLayout } from '@coop/cbs/transactions/ui-layouts';

import LoanDetailsPage from '../../../loan/accounts/details';

const AllAccountsDetails = () => {
  const router = useRouter();
  const accountType = router?.query['type'];

  if (accountType === 'SAVINGS') {
    return <AccountDetails />;
  }
  return <LoanDetailsPage />;
};

AllAccountsDetails.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <TransactionsSidebarLayout>{page}</TransactionsSidebarLayout>
    </MainLayout>
  );
};
export default AllAccountsDetails;
