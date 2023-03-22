import Link from 'next/link';
import { useRouter } from 'next/router';

import { Box, Scrollable, Text, WIPState } from '@myra-ui';

import { COADetailSidebar, ProductDetailPathBar } from '@coop/cbs/settings/ui-layout';
import { ROUTES } from '@coop/cbs/utils';

import { Overview, Transactions } from '../components/detail-tabs';
import { useCOAAccountDetails } from '../hooks';

export const COAAccountDetail = () => {
  const router = useRouter();

  const tabQuery = router.query['tab'] as string;

  const { accountDetails } = useCOAAccountDetails();

  return (
    <>
      <ProductDetailPathBar
        title="Charts of Accounts"
        name={
          <Link
            href={
              accountDetails?.meta?.isSavingAccount
                ? `${ROUTES.CBS_ACCOUNT_SAVING_DETAILS}?id=${
                    accountDetails?.meta?.accountId?.split('-')[1]
                  }`
                : accountDetails?.meta?.isLoanAccount
                ? `${ROUTES.CBS_LOAN_ACCOUNTS_DETAILS}?id=${
                    accountDetails?.meta?.accountId?.split('-')[1]
                  }`
                : `${ROUTES.CBS_TRANS_ALL_LEDGERS_DETAIL}?id=${
                    accountDetails?.meta?.accountId?.split('-')[0]
                  }`
            }
            target="_blank"
            rel="noreferer"
          >
            <Text
              fontSize="r2"
              fontWeight="Medium"
              color="gray.800"
              lineHeight="150%"
              cursor="pointer"
            >
              {accountDetails?.meta?.accountName}
            </Text>
          </Link>
        }
      />
      <Box display="flex">
        <Box
          w="320px"
          position="fixed"
          h="calc(100vh - 110px)"
          borderRight="1px"
          borderRightColor="border.layout"
          overflowY="auto"
        >
          <COADetailSidebar />
        </Box>
        <Scrollable detailPage>
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
        </Scrollable>
      </Box>
    </>
  );
};
