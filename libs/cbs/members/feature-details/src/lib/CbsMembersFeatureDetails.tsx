import { IoAddOutline } from 'react-icons/io5';
import { useRouter } from 'next/router';

import { useGetMemberDetailsOverviewQuery } from '@coop/cbs/data-access';
import { Box, Grid, Icon, Text } from '@coop/shared/ui';

import {
  MemberBasicInformation,
  MemberDetailsSidebar,
  MemberStatistics,
  UpcomingPaymentTable,
} from '../components';

const links = [
  {
    title: 'New Deposit',
    link: '/share/share-issue',
  },
  {
    title: 'New Withdraw',
    link: '/share/share-return',
  },
  {
    title: 'Account Transfer',
    link: '/share/share-return',
  },
  {
    title: 'New Account',
    link: '/share/share-return',
  },
  {
    title: 'New Share Issue',
    link: '/share/share-return',
  },
  {
    title: 'Share Return',
    link: '/share/share-return',
  },
  {
    title: 'New Loan Application',
    link: '/share/share-return',
  },
  {
    title: 'Loan Payment',
    link: '/share/share-return',
  },
  {
    title: 'New Cheques',
    link: '/share/share-return',
  },
];
export const MemberDetails = () => {
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

  return (
    <>
      {' '}
      <Box
        w="320px"
        position="fixed"
        h="calc(100vh - 110px)"
        borderRight="1px"
        borderRightColor="border.layout"
      >
        <MemberDetailsSidebar />
      </Box>
      <Box display="flex" p="s16" flexDir="column" gap="s16" ml="320px" bg="border.layout">
        <Text fontSize="r3" fontWeight="600">
          Overview
        </Text>
        <Box display="flex" flexDirection="column" gap="s16">
          <Text fontWeight="600" fontSize="r1">
            Quick Links
          </Text>
          <Grid templateColumns="repeat(3,1fr)" gap="s16">
            {links?.map((item) => (
              <Box
                display="flex"
                justifyContent="flex-start"
                alignItems="center"
                bg="white"
                borderRadius="br2"
                gap="s12"
                h="58px"
                pl="s16"
                key={`${item.title}${item.link}`}
                cursor="pointer"
                onClick={() => router.push(`${item.link}`)}
              >
                <Icon as={IoAddOutline} />
                <Text fontWeight="500" fontSize="s3">
                  {item.title}
                </Text>
              </Box>
            ))}
          </Grid>
        </Box>
        <MemberBasicInformation />
        {memberShareDetails && <MemberStatistics />}

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
      </Box>
    </>
  );
};
