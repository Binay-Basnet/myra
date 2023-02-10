import { useRouter } from 'next/router';

import { Box, DetailPageQuickLinks, Text } from '@myra-ui';

import { NatureOfDepositProduct, useGetMemberKymDetailsAccountsQuery } from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { amountConverter } from '@coop/shared/utils';

import { AccountList, SkeletonDetails, UpcomingPaymentTable } from '../components';

export const Accounts = () => {
  const router = useRouter();

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

  const isMemberAccountFetching = memberDetails?.isFetching;
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
      guaranteeAccounts: data?.guaranteeAccounts ?? [],
    })) || [];

  const closedAccountTitle = `Closed Accounts List (${
    memberDetails?.data?.members?.memberOverviewV2?.accounts?.data?.closedAccounts?.length ?? 0
  })`;

  const closedAccountList =
    memberDetails?.data?.members?.memberOverviewV2?.accounts?.data?.closedAccounts?.map(
      (account, index) => ({
        sn: Number(index) + 1,
        accountType: account?.productType,
        accountName: account?.accountName,
        accountNumber: account?.accountNumber,
        interestRate:
          account?.productType !== NatureOfDepositProduct?.Current ? account?.interestRate : '-',
        productName: account?.productName,
        guaranteeAccounts: account?.guaranteeAccounts ?? [],
      })
    ) || [];

  return (
    <>
      {isMemberAccountFetching && <SkeletonDetails />}
      {!isMemberAccountFetching && (
        <Box display="flex" flexDirection="column" gap="s16">
          <Text fontSize="r3" fontWeight="600">
            Saving Accounts
          </Text>
          <Box display="flex" flexDirection="column" gap="s16">
            <DetailPageQuickLinks links={links} />
          </Box>

          <AccountList title={title} accountList={accountList} />

          {memberPaymentUp && (
            <Box
              bg="white"
              display="flex"
              flexDirection="column"
              gap="s8"
              pb="s16"
              borderRadius="br2"
            >
              <Box display="flex" justifyContent="space-between" p="s16">
                <Text fontSize="r1" fontWeight="SemiBold">
                  Upcoming Payments
                </Text>
              </Box>
              <Box>
                <UpcomingPaymentTable data={memberPaymentUp} />
              </Box>
            </Box>
          )}

          <AccountList
            title={closedAccountTitle}
            accountList={closedAccountList}
            isClosedAccounts
          />
        </Box>
      )}
    </>
  );
};
