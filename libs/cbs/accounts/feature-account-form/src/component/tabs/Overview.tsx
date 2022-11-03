import { NatureOfDepositProduct } from '@coop/cbs/data-access';
import { DetailPageQuickLinks } from '@coop/shared/ui';
import { useAccountDetails } from '@coop/shared/utils';

import {
  AccountStatistics,
  BalanceChart,
  DetailPageTabHeader,
  GeneralInfoCard,
  RecentTransactions,
  UpcomingInstallments,
} from '../details';
// import {
//   MemberBasicInformation,
//   MemberStatistics,
//   RecentTransactions,
//   UpcomingPaymentTable,
// } from '../components';

// const Charts = dynamic(() => import('react-apexcharts'), { ssr: false });

const links = [
  {
    title: 'New Deposit',
    link: '/transactions/deposit/add',
  },
  {
    title: 'New Withdraw',
    link: '/transactions/withdraw/add',
  },
  {
    title: 'New Account Transfer',
    link: '/transactions/account-transfer/add',
  },
];

export const Overview = () => {
  const { accountDetails } = useAccountDetails();

  const generalInfos = [
    { label: 'Account Name', value: accountDetails?.accountName },
    { label: 'Product Name', value: accountDetails?.productName },
    {
      label: 'Account Open Date',
      value: accountDetails?.accountOpenDate,
    },
    { label: 'Default Amount Deposit Account Type', value: accountDetails?.accountType },
    { label: 'Interest Accrued', value: accountDetails?.interestAccrued ?? '0' },
    { label: 'Interest Earned', value: accountDetails?.interestEarned ?? '0' },
    { label: 'Guarantee Amount', value: accountDetails?.guaranteedAmount ?? '0' },
  ];

  const additionalFeatures = [
    {
      label: 'Allow Partial Installment',
      value: accountDetails?.allowPartialInstallment ? 'Yes' : 'No',
    },
    {
      label: 'Is Monthly Interest Compulsory',
      value: accountDetails?.monthlyInterestCompulsory ? 'Yes' : 'No',
    },
    { label: 'Staff Profuct', value: accountDetails?.staffProduct ? 'Yes' : 'No' },
    {
      label: 'Support Multiple Account',
      value: accountDetails?.supportMultiple ? 'Yes' : 'No',
    },
    { label: 'Insurance', value: accountDetails?.allowLoan ? 'Yes' : 'No' },
    { label: 'ATM Facility', value: accountDetails?.atmFacility ? 'Yes' : 'No' },
  ];

  return (
    <>
      <DetailPageTabHeader heading="Overview" />

      <DetailPageQuickLinks links={links} />

      <AccountStatistics />

      <GeneralInfoCard title="General Information" items={generalInfos} />

      <BalanceChart />

      <RecentTransactions />

      {(accountDetails?.accountType === NatureOfDepositProduct.RecurringSaving ||
        (accountDetails?.accountType === NatureOfDepositProduct.Saving &&
          accountDetails?.isMandatory)) && <UpcomingInstallments />}

      <GeneralInfoCard title="Additional Features" items={additionalFeatures} />

      {/* <MemberBasicInformation /> */}
      {/* <Grid templateColumns="repeat(2,1fr)" gap="s16">
        <Box display="flex" flexDirection="column" gap="s16" bg="white" p="s16">
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
        <Box display="flex" flexDirection="column" gap="s16" bg="white" p="s16">
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
      </Grid> */}

      {/* {memberShareDetails && <MemberStatistics />}
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
      <RecentTransactions /> */}
    </>
  );
};
