import { DetailPageQuickLinks } from '@myra-ui';

import { NatureOfDepositProduct, useAccountDetails } from '@coop/cbs/data-access';

import {
  AccountStatistics,
  BalanceChart,
  GeneralInfoCard,
  RecentTransactions,
  TabHeader,
  UpcomingInstallments,
} from '../details';
// import {
//   MemberBasicInformation,
//   MemberStatistics,
//   RecentTransactions,
//   UpcomingPaymentTable,
// } from '../components';

// const Charts = dynamic(() => import('react-apexcharts'), { ssr: false });

const accountTypes = {
  [NatureOfDepositProduct.Saving]: 'Saving Account',
  [NatureOfDepositProduct.RecurringSaving]: 'Recurring Saving Account',
  [NatureOfDepositProduct.TermSavingOrFd]: 'Term Saving Account',
  [NatureOfDepositProduct.Current]: 'Current Account',
};

export const Overview = () => {
  const { accountDetails } = useAccountDetails();
  const isTermSaving = accountDetails?.accountType === 'TERM_SAVING_OR_FD';

  const links = [
    {
      title: 'New Deposit',
      link: `/transactions/deposit/add?memberId=${accountDetails?.member?.id}&accountId=${accountDetails?.accountId}`,
    },
    {
      title: 'New Withdraw',
      link: `/transactions/withdraw/add?memberId=${accountDetails?.member?.id}&accountId=${accountDetails?.accountId}`,
    },
    {
      title: 'New Account Transfer',
      link: `/transactions/account-transfer/add?memberId=${accountDetails?.member?.id}&srcAccountId=${accountDetails?.accountId}`,
    },
  ];

  const generalInfos = [
    { label: 'Account Name', value: accountDetails?.accountName },
    { label: 'Product Name', value: accountDetails?.productName },
    {
      label: 'Account Open Date',
      value: accountDetails?.accountOpenDate,
    },
    {
      label: 'Default Amount Deposit Account Type',
      value:
        accountDetails?.accountType === NatureOfDepositProduct.RecurringSaving ||
        (accountDetails?.accountType === NatureOfDepositProduct?.Current &&
          accountDetails?.isMandatory)
          ? accountDetails?.defaultAccountType
            ? accountTypes[accountDetails?.defaultAccountType]
            : '-'
          : '',
    },
    {
      label: 'Interest Accrued',
      value:
        accountDetails?.accountType === NatureOfDepositProduct.Current
          ? null
          : accountDetails?.interestAccrued ?? '0',
    },
    {
      label: 'Interest Earned',
      value:
        accountDetails?.accountType === NatureOfDepositProduct.Current
          ? null
          : accountDetails?.interestEarned ?? '0',
    },
    {
      label: 'Interest Rate',
      value:
        accountDetails?.accountType === NatureOfDepositProduct.Current
          ? null
          : `${accountDetails?.interestRate} %`,
    },
    { label: 'Guarantee Amount', value: accountDetails?.guaranteedAmount ?? '0' },
    { label: 'Tenure', value: accountDetails?.accountTenure ?? '-' },
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
      <TabHeader heading="Overview" />

      {!isTermSaving && <DetailPageQuickLinks links={links} />}

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
