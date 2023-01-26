import { IoCreateOutline } from 'react-icons/io5';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { Box, DetailPageQuickLinks, Grid, Text } from '@myra-ui';

import {
  CooperativeBasicMinInfo,
  CooperativeUnionBasicMinInfo,
  IndividualBasicMinInfo,
  InstitutionBasicMinInfo,
  useGetMemberKymDetailsOverviewQuery,
} from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { amountConverter } from '@coop/shared/utils';

import {
  MemberBasicInformation,
  MemberStatistics,
  RecentTransactions,
  UpcomingPaymentTable,
} from '../components';
import { SkeletonDetails } from '../components/SkeletonDetailsPage';

const Charts = dynamic(() => import('react-apexcharts'), { ssr: false });

export const Overview = () => {
  const router = useRouter();
  const id = router.query['id'] as string;
  const memberDetails = useGetMemberKymDetailsOverviewQuery(
    {
      id: router.query['id'] as string,
    },
    {
      enabled: !!id,
    }
  );

  const memberPayment = memberDetails?.data?.members?.memberOverviewV2?.overview?.data?.payments;

  const memberShareDetails =
    memberDetails?.data?.members?.memberOverviewV2?.overview?.data?.statistics;
  const memberGraphs =
    memberDetails?.data?.members?.memberOverviewV2?.overview?.data?.memberGraphs?.deposit?.data;

  const dataForGraphs = memberGraphs?.map((item) => [item?.time ?? 0, Number(item?.amount)]) as [
    number,
    number
  ][];
  const memberGraphWithdraw =
    memberDetails?.data?.members?.memberOverviewV2?.overview?.data?.memberGraphs?.withdraw?.data;
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
  const memberDetailsData = useGetMemberKymDetailsOverviewQuery({
    id: router.query['id'] as string,
  });

  const memberIndividual =
    memberDetailsData?.data?.members?.memberOverviewV2?.overview?.data?.basicInformation
      ?.__typename === 'IndividualBasicMinInfo'
      ? (memberDetailsData?.data?.members?.memberOverviewV2?.overview?.data
          ?.basicInformation as IndividualBasicMinInfo)
      : null;

  const memberBasicInstitution =
    memberDetailsData?.data?.members?.memberOverviewV2?.overview?.data?.basicInformation
      ?.__typename === 'InstitutionBasicMinInfo'
      ? (memberDetailsData?.data?.members?.memberOverviewV2?.overview?.data
          ?.basicInformation as InstitutionBasicMinInfo)
      : null;

  const memberBasicCooperative =
    memberDetailsData?.data?.members?.memberOverviewV2?.overview?.data?.basicInformation
      ?.__typename === 'CooperativeBasicMinInfo'
      ? (memberDetailsData?.data?.members?.memberOverviewV2?.overview?.data
          ?.basicInformation as CooperativeBasicMinInfo)
      : null;

  const memberBasicCooperativeUnion =
    memberDetailsData?.data?.members?.memberOverviewV2?.overview?.data?.basicInformation
      ?.__typename === 'CooperativeUnionBasicMinInfo'
      ? (memberDetailsData?.data?.members?.memberOverviewV2?.overview?.data
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
      link: `${ROUTES.CBS_MEMBER}/${memberType}/edit/${id}`,
      icon: IoCreateOutline,
    },
  ];

  return (
    <>
      {meberFetching && <SkeletonDetails />}
      {!meberFetching && (
        <Box display="flex" flexDirection="column" gap="s16">
          <Text fontSize="r3" fontWeight="600">
            Overview
          </Text>

          <Box display="flex" flexDirection="column" gap="s16">
            <DetailPageQuickLinks links={links} />
          </Box>
          <MemberBasicInformation />
          <Grid templateColumns="repeat(2,1fr)" gap="s16">
            <Box
              boxShadow="E0"
              borderRadius="br2"
              display="flex"
              flexDirection="column"
              gap="s16"
              bg="white"
              p="s16"
            >
              <Text fontSize="r1" fontWeight="Medium">
                Deposit
              </Text>

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
                    show: false,
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
                    borderColor: '#ffffff',
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
            <Box
              boxShadow="E0"
              borderRadius="br2"
              display="flex"
              flexDirection="column"
              gap="s16"
              bg="white"
              p="s16"
            >
              <Text fontSize="r1" fontWeight="Medium">
                Withdraw
              </Text>

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
                    borderColor: '#fff',
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
            <Box boxShadow="E0" bg="white" display="flex" flexDirection="column" borderRadius="br2">
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
        </Box>
      )}
    </>
  );
};
