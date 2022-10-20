import { IoAddOutline } from 'react-icons/io5';
import { useRouter } from 'next/router';

import { useGetMemberDetailsOverviewQuery, useGetNewIdMutation } from '@coop/cbs/data-access';
import { Box, Grid, Icon, Text } from '@coop/shared/ui';

import {
  MemberBasicInformation,
  MemberStatistics,
  RecentTransactions,
  UpcomingPaymentTable,
} from '../components';

const links = [
  {
    title: 'New Deposit',
    link: '/share/share-issue',
  },
  {
    title: 'New Withdraw',
    link: '/transactions/withdraw/add',
  },
  {
    title: 'Account Transfer',
    link: '/transfer',
  },
  {
    title: 'New Account',
    link: '/accounts/account-open',
  },
  {
    title: 'New Share Issue',
    link: '/share/share-issue',
  },
  {
    title: 'Share Return',
    link: '/share/share-return',
  },
  {
    title: 'New Loan Application',
    link: '/loan/apply',
  },
  {
    title: 'Loan Payment',
    link: '/loan/repayments/add',
  },
  {
    title: 'New Cheques',
    link: '/share/share-return',
  },
];
export const Overview = () => {
  const router = useRouter();
  const memberDetails = useGetMemberDetailsOverviewQuery({
    id: router.query['id'] as string,
  });

  const memberPayment = memberDetails?.data?.members?.memberOverview?.data?.overview?.payments;
  const memberShareDetails =
    memberDetails?.data?.members?.memberOverview?.data?.overview?.statistics;
  const memberPaymentUp = memberPayment?.map((data, index) => ({
    sn: Number(index) + 1,
    date: data?.date,
    accountName: data?.accountName,
    paymentType: data?.paymentType,
    amount: data?.amount,
  }));
  const newId = useGetNewIdMutation();

  return (
    <>
      <Text fontSize="r3" fontWeight="600">
        Overview
      </Text>
      <Box display="flex" flexDirection="column" gap="s16">
        <Text fontWeight="600" fontSize="r1">
          Quick Links
        </Text>
        <Grid templateColumns="repeat(3,1fr)" gap="s16">
          {links?.map((item) => (
            <Box key={`${item.link}${item.title}`}>
              {item.title === 'New Account' && (
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
                      .mutateAsync({})
                      .then((res) => router.push(`${item.link}/add/${res?.newId}`))
                  }
                >
                  <Icon as={IoAddOutline} />

                  <Text fontWeight="500" fontSize="s3">
                    {item.title}
                  </Text>
                </Box>
              )}
              {item.title !== 'New Account' && (
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
                  onClick={() => router.push(`${item.link}`)}
                >
                  <Icon as={IoAddOutline} />

                  <Text fontWeight="500" fontSize="s3">
                    {item.title}
                  </Text>
                </Box>
              )}
            </Box>
          ))}
        </Grid>
      </Box>
      <MemberBasicInformation />
      {memberShareDetails && <MemberStatistics />}
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
      <RecentTransactions />
    </>
  );
};
