import { useRouter } from 'next/router';

import { Box, DetailPageQuickLinks, Text } from '@myra-ui';

import {
  NatureOfDepositProduct,
  ObjState,
  useGetAccountTableListMinimalQuery,
  useGetMemberKymDetailsAccountsQuery,
} from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { amountConverter } from '@coop/shared/utils';

import { AccountList, UpcomingPaymentTable } from '../components';

export const Accounts = () => {
  const router = useRouter();
  const id = router.query['id'] as string;
  const links = [
    {
      title: 'Account Open',
      link: ROUTES.CBS_ACCOUNT_OPEN_ADD,
    },
    {
      title: 'Account Close',
      link: ROUTES.CBS_ACCOUNT_CLOSE_ADD,
    },
  ];
  const memberDetails = useGetMemberKymDetailsAccountsQuery({
    id: router.query['id'] as string,
  });

  const memberPayment = memberDetails?.data?.members?.memberOverviewV2?.accounts?.data?.payments;

  const memberPaymentUp = memberPayment?.map((data, index) => ({
    sn: Number(index) + 1,
    id: data?.accountId,
    date: data?.date,
    accountName: data?.accountName,
    paymentType: data?.paymentType,
    installmentNo: data?.installmentNo,
    amount: amountConverter(data?.amount as string),
  }));
  // const newId = useGetNewIdMutation();

  const memberAccountDetails =
    memberDetails?.data?.members?.memberOverviewV2?.accounts?.data?.accounts;
  const memberLength = memberAccountDetails?.length ?? 0;
  const title = `Saving Accounts List(${memberLength})`;
  const accountList =
    memberAccountDetails?.map((data, index) => ({
      sn: Number(index) + 1,
      accountType: data?.productType,
      accountName: data?.accountName,
      accountNumber: data?.accountNumber,
      totalBalance: data?.totalBalance,
      interestRate:
        data?.productType !== NatureOfDepositProduct?.Current ? data?.interestRate : '-',
      productName: data?.productName,
    })) || [];

  const { data: closedAccountListQueryData } = useGetAccountTableListMinimalQuery(
    {
      paginate: {
        first: -1,
        after: '',
      },
      filter: {
        objState: ObjState.Inactive,
        memberId: id,
      },
    },
    {
      enabled: !!id,
    }
  );

  const closedAccountTitle = `Closed Accounts List (${
    closedAccountListQueryData?.account?.list?.edges?.length ?? 0
  })`;

  const closedAccountList =
    closedAccountListQueryData?.account?.list?.edges?.map((account, index) => ({
      sn: Number(index) + 1,
      accountType: account?.node?.product?.nature,
      accountName: account?.node?.accountName,
      accountNumber: account?.node?.id,
      interestRate: account?.node?.product?.interest,
      productName: account?.node?.product?.productName,
    })) || [];

  return (
    <>
      <Text fontSize="r3" fontWeight="600">
        Saving Accounts
      </Text>
      <Box display="flex" flexDirection="column" gap="s16">
        <DetailPageQuickLinks links={links} />
      </Box>

      <AccountList title={title} accountList={accountList} />

      {memberPaymentUp && (
        <Box bg="white" display="flex" flexDirection="column" gap="s8" pb="s16" borderRadius="br2">
          <Box display="flex" justifyContent="space-between" p="s16">
            <Text fontSize="r1" fontWeight="600">
              {' '}
              Upcoming Payments
            </Text>
          </Box>
          <Box>
            <UpcomingPaymentTable data={memberPaymentUp} />
          </Box>
        </Box>
      )}

      <AccountList title={closedAccountTitle} accountList={closedAccountList} isClosedAccounts />
    </>
  );
};
