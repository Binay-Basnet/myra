import { ReactElement } from 'react';
import { useRouter } from 'next/router';

import { Box, MainLayout } from '@myra-ui';

import { AccountDetails } from '@coop/cbs/accounts/account-form';
import { TransactionsSidebarLayout } from '@coop/cbs/transactions/ui-layouts';
import { CbsLoanFeatureLoanAccountDetail } from '@coop/loan/account-details';

const AllAccountsDetails = () => {
  const router = useRouter();
  const accountType = router?.query['type'];

  if (accountType === 'SAVINGS') {
    return (
      <Box>
        <AccountDetails />
      </Box>
    );
  }
  return <CbsLoanFeatureLoanAccountDetail />;
};

AllAccountsDetails.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <TransactionsSidebarLayout>{page}</TransactionsSidebarLayout>
    </MainLayout>
  );
};
export default AllAccountsDetails;
