import { IoAddOutline, IoCreateOutline } from 'react-icons/io5';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { Box, Grid, Icon, Text } from '@myra-ui';

import {
  CooperativeBasicMinInfo,
  CooperativeUnionBasicMinInfo,
  IndividualBasicMinInfo,
  InstitutionBasicMinInfo,
  useGetMemberDetailsOverviewQuery,
  useGetMemberOverviewBasicDetailsQuery,
} from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { amountConverter } from '@coop/shared/utils';

import {
  MemberBasicInformation,
  MemberStatistics,
  RecentTransactions,
  UpcomingPaymentTable,
} from '../components';

const Charts = dynamic(() => import('react-apexcharts'), { ssr: false });

export const Overview = () => {
  const router = useRouter();
  const id = router.query['id'] as string;
  const memberDetails = useGetMemberDetailsOverviewQuery({
    id: router.query['id'] as string,
  });

  const links = [
    {
      title: 'New Deposit',
      link: `${ROUTES.CBS_TRANS_DEPOSIT_ADD}?memberId=${id}`,
    },
    {
      title: 'New Withdraw',
      link: `${ROUTES.CBS_TRANS_WITHDRAW_ADD}?memberId=${id}`,
    },
    {
      title: 'Account Transfer',
      link: `${ROUTES.CBS_TRANS_ACCOUNT_TRANSFER_ADD}?memberId=${id}`,
    },
    {
      title: 'New Account',
      link: `${ROUTES.CBS_ACCOUNT_OPEN_ADD}?memberId=${id}`,
    },
    {
      title: 'New Share Issue',
      link: `${ROUTES.CBS_SHARE_ISSUE_ADD}?memberId=${id}`,
    },
    {
      title: 'Share Return',
      link: `${ROUTES.CBS_SHARE_ISSUE_ADD}?memberId=${id}`,
    },
    {
      title: 'New Loan Application',
      link: `${ROUTES.CBS_LOAN_APPLICATIONS_ADD}?memberId=${id}`,
    },
    {
      title: 'Loan Payment',
      link: `${ROUTES.CBS_LOAN_REPAYMENTS_ADD}?memberId=${id}`,
    },
    {
      title: 'Edit KYM',
      link: `/members`,
    },
  ];

  const memberPayment = memberDetails?.data?.members?.memberOverview?.data?.overview?.payments;

  const memberShareDetails =
    memberDetails?.data?.members?.memberOverview?.data?.overview?.statistics;
  const memberGraphs =
    memberDetails?.data?.members?.memberOverview?.data?.overview?.memberGraphs?.deposit?.data;

  const dataForGraphs = memberGraphs?.map((item) => [item?.time ?? 0, Number(item?.amount)]) as [
    number,
    number
  ][];
  const memberGraphWithdraw =
    memberDetails?.data?.members?.memberOverview?.data?.overview?.memberGraphs?.withdraw?.data;
  const dataForGraphWithdraw = memberGraphWithdraw?.map((item) => [
    item?.time ?? 0,
    Number(item?.amount),
  ]) as [number, number][];

  const memberPaymentUp = memberPayment?.map((data, index) => ({
    sn: Number(index) + 1,
    id: data?.accountId,
    date: data?.date,
    accountName: data?.accountName,
    paymentType: data?.paymentType,
    installmentNo: data?.installmentNo,
    amount: amountConverter(data?.amount as string),
  }));

  // to find out member type
  const memberDetailsData = useGetMemberOverviewBasicDetailsQuery({
    id: router.query['id'] as string,
  });

  const memberIndividual =
    memberDetailsData?.data?.members?.memberOverview?.data?.overview?.basicInformation
      ?.__typename === 'IndividualBasicMinInfo'
      ? (memberDetailsData?.data?.members?.memberOverview?.data?.overview
          ?.basicInformation as IndividualBasicMinInfo)
      : null;

  const memberBasicInstitution =
    memberDetailsData?.data?.members?.memberOverview?.data?.overview?.basicInformation
      ?.__typename === 'InstitutionBasicMinInfo'
      ? (memberDetailsData?.data?.members?.memberOverview?.data?.overview
          ?.basicInformation as InstitutionBasicMinInfo)
      : null;

  const memberBasicCooperative =
    memberDetailsData?.data?.members?.memberOverview?.data?.overview?.basicInformation
      ?.__typename === 'CooperativeBasicMinInfo'
      ? (memberDetailsData?.data?.members?.memberOverview?.data?.overview
          ?.basicInformation as CooperativeBasicMinInfo)
      : null;

  const memberBasicCooperativeUnion =
    memberDetailsData?.data?.members?.memberOverview?.data?.overview?.basicInformation
      ?.__typename === 'CooperativeUnionBasicMinInfo'
      ? (memberDetailsData?.data?.members?.memberOverview?.data?.overview
          ?.basicInformation as CooperativeUnionBasicMinInfo)
      : null;

  let memberType = 'individual';
  if (memberIndividual) {
    memberType = 'individual';
  } else if (memberBasicInstitution) {
    memberType = 'institution';
  } else if (memberBasicCooperative) {
    memberType = 'coop';
  } else if (memberBasicCooperativeUnion) {
    memberType = 'coop_union';
  } else {
    memberType = 'individual';
  }

  return (
    <>
      <Text fontSize="r3" fontWeight="600">
        Overview
      </Text>
      <Box display="flex" flexDirection="column" gap="s16" pb="s16">
        <Text fontWeight="600" fontSize="r1">
          Quick Links
        </Text>
        <Grid templateColumns="repeat(3,1fr)" gap="s16">
          {links?.map((item) => (
            <Box key={`${item.link}${item.title}`}>
              {item.title === 'Edit KYM' ? (
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
                  onClick={() => {
                    router.push(`/cbs/members/${memberType}/edit/${router.query['id'] as string}`);
                  }}
                >
                  <Icon as={IoCreateOutline} />

                  <Text fontWeight="500" fontSize="s3">
                    Edit KYM
                  </Text>
                </Box>
              ) : (
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
      <Grid templateColumns="repeat(2,1fr)" gap="s16">
        <Box borderRadius="br2" display="flex" flexDirection="column" gap="s16" bg="white" p="s16">
          <Text>Deposit</Text>{' '}
          <Charts
            series={[
              {
                name: 'Deposit',
                data: dataForGraphs,
              },
            ]}
            type="area"
            height="400px"
            w="100%"
            options={{
              chart: {
                toolbar: {
                  show: false,
                },
              },
              xaxis: {
                type: 'datetime',
              },
              colors: ['#82CA9D'],
              fill: {
                type: 'gradient',
              },
              legend: {
                show: true,
                horizontalAlign: 'right',
                position: 'bottom',

                showForSingleSeries: true,
              },
              // fill: {
              //   colors: ['#82CA9D'],
              // },
              dataLabels: {
                enabled: false,
              },
              grid: {
                borderColor: '#cccccc',
                strokeDashArray: 2,
                yaxis: {
                  lines: {
                    show: true,
                  },
                },
                xaxis: {
                  lines: {
                    show: true,
                  },
                },
              },
            }}
          />
        </Box>
        <Box borderRadius="br2" display="flex" flexDirection="column" gap="s16" bg="white" p="s16">
          <Text>Withdraw</Text>{' '}
          <Charts
            series={[
              {
                name: 'Withdraw',
                data: dataForGraphWithdraw,
              },
            ]}
            type="area"
            height="400px"
            w="100%"
            options={{
              chart: {
                toolbar: {
                  show: false,
                },
              },
              xaxis: {
                type: 'datetime',
              },
              colors: ['#FFECEB'],
              legend: {
                show: true,
                horizontalAlign: 'right',
                position: 'bottom',

                showForSingleSeries: true,
              },
              // fill: {
              //   colors: ['#82CA9D'],
              // },
              dataLabels: {
                enabled: false,
              },
              grid: {
                borderColor: '#cccccc',
                strokeDashArray: 2,
                yaxis: {
                  lines: {
                    show: true,
                  },
                },
                xaxis: {
                  lines: {
                    show: true,
                  },
                },
              },
            }}
          />
        </Box>
      </Grid>

      {memberShareDetails && <MemberStatistics />}
      {memberPaymentUp && (
        <Box bg="white" display="flex" flexDirection="column" borderRadius="br2">
          <Box display="flex" justifyContent="space-between" p="s16">
            <Text fontSize="r1" fontWeight="SemiBold">
              Upcoming Payments
            </Text>
          </Box>
          <Box borderRadius="br4" p="s16">
            <UpcomingPaymentTable data={memberPaymentUp} />
          </Box>
        </Box>
      )}
      <RecentTransactions />
    </>
  );
};
