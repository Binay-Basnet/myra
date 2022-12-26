import { useRouter } from 'next/router';

import { Box, WIPState } from '@myra-ui';

import { AccountDetailsPathBar } from '@coop/cbs/accounts/ui-components';
import { AccountDetailsSidebar } from '@coop/cbs/accounts/ui-layouts';

import { Overview, Transactions, WithdrawSlip } from '../component';

export const AccountDetails = () => {
  const router = useRouter();

  const tabQuery = router.query['tab'] as string;

  return (
    <>
      <AccountDetailsPathBar title="Savings Account List" />
      <Box
        w="320px"
        position="fixed"
        h="calc(100vh - 110px)"
        borderRight="1px"
        borderRightColor="border.layout"
        overflowY="auto"
      >
        <AccountDetailsSidebar />
      </Box>
      <Box
        display="flex"
        p="s16"
        flexDir="column"
        gap="s16"
        ml="320px"
        bg="background.500"
        minH="calc(100vh - 170px)"
      >
        {(tabQuery === 'overview' || tabQuery === 'undefined' || !tabQuery) && <Overview />}

        {tabQuery === 'transactions' && <Transactions />}

        {tabQuery === 'withdraw slip' && <WithdrawSlip />}

        {tabQuery &&
          !['undefined', 'overview', 'transactions', 'withdraw slip'].includes(tabQuery) && (
            <Box h="calc(100vh - 110px)">
              <WIPState />
            </Box>
          )}

        {/* {tabQuery === 'accounts' && <Account />}
        {tabQuery === 'activity' && <Activity />}
        {tabQuery === 'bio' && <Bio />}
        {tabQuery === 'cheque' && <Cheque />}
        {tabQuery === 'documents' && <Documents />}
        {tabQuery === 'reports' && <Reports />}
        {tabQuery === 'share' && <Share />}
        {tabQuery === 'tasks' && <Tasks />}
        {tabQuery === 'transactions' && <Transactions />} */}
      </Box>
    </>
  );
};
