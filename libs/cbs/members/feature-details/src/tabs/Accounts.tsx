import { IoAddOutline } from 'react-icons/io5';
import { useRouter } from 'next/router';

import { Box, Grid, Icon, Text } from '@myra-ui';

import {
  Id_Type,
  NatureOfDepositProduct,
  ObjState,
  useGetAccountTableListQuery,
  useGetMemberDetailsOverviewQuery,
  useGetNewIdMutation,
} from '@coop/cbs/data-access';
import { amountConverter } from '@coop/shared/utils';

import { AccountList, UpcomingPaymentTable } from '../components';

export const Accounts = () => {
  const router = useRouter();
  const id = router.query['id'] as string;
  const links = [
    {
      title: 'Account Open',
      link: `/savings/account-open`,
    },
    {
      title: 'Account Close',
      link: `/savings/account-close`,
    },
  ];
  const memberDetails = useGetMemberDetailsOverviewQuery({
    id: router.query['id'] as string,
  });

  const memberPayment = memberDetails?.data?.members?.memberOverview?.data?.overview?.payments;
  const memberPaymentUp = memberPayment?.map((data, index) => ({
    sn: Number(index) + 1,
    date: data?.date,
    accountName: data?.accountName,
    paymentType: data?.paymentType,
    amount: amountConverter(data?.amount as string),
  }));
  const newId = useGetNewIdMutation();

  const memberAccountDetails =
    memberDetails?.data?.members?.memberOverview?.data?.accounts?.accounts;
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

  const { data: closedAccountListQueryData } = useGetAccountTableListQuery(
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
      <Box display="flex" flexDirection="column" gap="s16" pb="s16">
        <Text fontWeight="600" fontSize="r1">
          Quick Links
        </Text>
        <Grid templateColumns="repeat(3,1fr)" gap="s16">
          {links?.map((item) => (
            <Box key={`${item.link}${item.title}`}>
              <Box
                display="flex"
                justifyContent="flex-start"
                alignItems="center"
                bg="white"
                borderRadius="br2"
                gap="s12"
                h="58px"
                pl="s16"
                cursor="pointer"
                onClick={() =>
                  newId
                    .mutateAsync({ idType: Id_Type.Account })
                    .then((res) => router.push(`${item.link}/add/${res?.newId}?memberId=${id}`))
                }
              >
                <Icon as={IoAddOutline} />

                <Text fontWeight="500" fontSize="s3">
                  {item.title}
                </Text>
              </Box>
            </Box>
          ))}
        </Grid>
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
