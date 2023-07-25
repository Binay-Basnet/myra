import { useMemo } from 'react';
import { AiOutlineFileText } from 'react-icons/ai';

import { Alert, DetailPageQuickLinks } from '@myra-ui';

import { NatureOfDepositProduct, ObjState, useAccountDetails } from '@coop/cbs/data-access';
import { localizedDate, ROUTES } from '@coop/cbs/utils';

import {
  AccountStatistics,
  AdditionalInfoCard,
  AssociatedGuaranteeAccounts,
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

// const accountTypes = {
//   [NatureOfDepositProduct.Saving]: 'Saving Account',
//   [NatureOfDepositProduct.RecurringSaving]: 'Recurring Saving Account',
//   [NatureOfDepositProduct.TermSavingOrFd]: 'Term Saving Account',
//   [NatureOfDepositProduct.Current]: 'Current Account',
// };

export const Overview = () => {
  const { accountDetails } = useAccountDetails();
  const isTermSaving = accountDetails?.accountType === 'TERM_SAVING_OR_FD';
  const isClosed = accountDetails?.objState === ObjState?.Inactive;

  const links = [
    {
      title: 'New Deposit',
      link: `${ROUTES.CBS_TRANS_DEPOSIT_ADD}?memberId=${accountDetails?.member?.id}&accountId=${accountDetails?.accountId}`,
    },
    {
      title: 'New Withdraw',
      link: `${ROUTES.CBS_TRANS_WITHDRAW_ADD}?memberId=${accountDetails?.member?.id}&accountId=${accountDetails?.accountId}`,
    },
    {
      title: 'New Account Transfer',
      link: `${ROUTES.CBS_ACCOUNT_TRANSFER_ADD}?memberId=${accountDetails?.member?.id}&srcAccountId=${accountDetails?.accountId}`,
    },
    {
      title: 'Saving Statement',
      link: `${ROUTES.CBS_REPORTS_SAVING_STATEMENT}?memberId=${accountDetails?.member?.id}&accountId=${accountDetails?.accountId}`,
      icon: AiOutlineFileText,
    },
    {
      title: 'Interest Statement',
      link: `${ROUTES.CBS_REPORTS_INTEREST_STATEMENT}?memberId=${accountDetails?.member?.id}&accountId=${accountDetails?.accountId}`,
      icon: AiOutlineFileText,
    },
    {
      title: 'Interest Tax',
      link: ROUTES.CBS_REPORTS_INTEREST_TAX_REPORT,
      icon: AiOutlineFileText,
    },
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
    // { label: 'Insurance', value: accountDetails?.allowLoan ? 'Yes' : 'No' },
    { label: 'ATM Facility', value: accountDetails?.atmFacility ? 'Yes' : 'No' },
  ];

  const generalInfoData = {
    accountName: accountDetails?.accountName,
    productId: accountDetails?.productId,
    productName: accountDetails?.productName,
    accountOpenDate: accountDetails?.accountOpenDate,
    defaultAccountType: accountDetails?.defaultAccountType,
    accountType: accountDetails?.accountType,
    interestAccrued: accountDetails?.interestAccrued,
    interestEarned: accountDetails?.interestEarned,
    interestRate: accountDetails?.interestRate,
    guaranteedAmount: accountDetails?.guaranteedAmount,
    accountTenure: accountDetails?.accountTenure,
    isMandatory: accountDetails?.isMandatory,
    nomineeAccountNumber: accountDetails?.nomineeAccountNumber,
    nomineeAccountName: accountDetails?.nomineeAccountName,
    productMinimumBalance: accountDetails?.product?.minimumBalance,
    accountExpiryDate: accountDetails?.accountExpiryDate,
    signaturePicUrl: accountDetails?.member?.signaturePicUrl,
    installmentAmount: accountDetails?.installmentAmount,
  };

  const { lockedTransaction, from, to } = useMemo(() => {
    if (!accountDetails?.transactionConstraints) return { lockedTransaction: '', from: '', to: '' };

    if (accountDetails.transactionConstraints?.transactionType === 'BOTH') {
      return {
        lockedTransaction: 'Deposit and Withdraw',
        from: localizedDate(accountDetails.transactionConstraints?.effectiveSince),
        to: localizedDate(accountDetails.transactionConstraints?.effectiveTill),
      };
    }

    if (accountDetails.transactionConstraints?.transactionType === 'CREDIT') {
      return {
        lockedTransaction: 'Deposit',
        from: localizedDate(accountDetails.transactionConstraints?.effectiveSince),
        to: localizedDate(accountDetails.transactionConstraints?.effectiveTill),
      };
    }

    if (accountDetails.transactionConstraints?.transactionType === 'DEBIT') {
      return {
        lockedTransaction: 'Withdraw',
        from: localizedDate(accountDetails.transactionConstraints?.effectiveSince),
        to: localizedDate(accountDetails.transactionConstraints?.effectiveTill),
      };
    }

    return { lockedTransaction: '', from: '', to: '' };
  }, [accountDetails?.transactionConstraints]);

  return (
    <>
      <TabHeader heading="Overview" />

      {isClosed && (
        <Alert
          status="error"
          subtitle={
            accountDetails?.closedAt?.local
              ? `This Account has been closed at ${localizedDate(accountDetails.closedAt)}.`
              : 'This Account has been Closed.'
          }
          hideCloseIcon
        />
      )}

      {lockedTransaction && (
        <Alert
          status="info"
          title={`${lockedTransaction} locked in this account from ${from} to ${to}`}
          hideCloseIcon
        />
      )}

      {!isTermSaving && !isClosed && <DetailPageQuickLinks links={links} />}

      <AccountStatistics />

      <GeneralInfoCard
        title="General Information"
        data={generalInfoData}
        // accountTypes={accountTypes}
      />

      <BalanceChart />

      <AssociatedGuaranteeAccounts />

      <RecentTransactions isClosed={isClosed} />

      {((accountDetails?.accountType === NatureOfDepositProduct.RecurringSaving &&
        accountDetails?.product?.depositFrequency) ||
        (accountDetails?.accountType === NatureOfDepositProduct.Saving &&
          accountDetails?.isMandatory &&
          !isClosed)) && <UpcomingInstallments />}

      <AdditionalInfoCard title="Additional Features" items={additionalFeatures} />

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

      {/* {memberShareDetails && <MemberStatistics />}IChangeNomineeProps
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
