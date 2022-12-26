import { DetailPageQuickLinks } from '@myra-ui';

import { NatureOfDepositProduct, useAccountDetails } from '@coop/cbs/data-access';
import { amountConverter } from '@coop/shared/utils';

import {
  BalanceChart,
  GeneralInfoCard,
  RecentTransactions,
  Statistics,
  TabHeader,
  UpcomingPayments,
} from '../component';

const accountTypes = {
  [NatureOfDepositProduct.Saving]: 'Saving Account',
  [NatureOfDepositProduct.RecurringSaving]: 'Recurring Saving Account',
  [NatureOfDepositProduct.TermSavingOrFd]: 'Term Saving Account',
  [NatureOfDepositProduct.Current]: 'Current Account',
};

export const OverviewPage = () => {
  const { accountDetails } = useAccountDetails();

  const links = [
    {
      title: 'Loan Repayment',
      link: `/loan/repayments/add`,
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
    { label: 'Loan Account Open Brancht', value: accountDetails?.guaranteedAmount ?? '0' },
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
    { label: 'Insurance', value: accountDetails?.monthlyInterestCompulsory ? 'Yes' : 'No' },
    { label: 'Collateral', value: accountDetails?.monthlyInterestCompulsory ? 'Yes' : 'No' },
    { label: 'Staff Profuct', value: accountDetails?.staffProduct ? 'Yes' : 'No' },
    {
      label: 'Support Multiple Account',
      value: accountDetails?.supportMultiple ? 'Yes' : 'No',
    },
    { label: 'Loan Schedule Change Override', value: accountDetails?.allowLoan ? 'Yes' : 'No' },
    { label: 'Override Interest', value: accountDetails?.atmFacility ? 'Yes' : 'No' },
  ];

  const accountSummary = [
    {
      title: 'Total Payable Amount',
      value: amountConverter(accountDetails?.accountBalance ?? 0),
    },
    {
      title: 'Total Paid Amount',
      value: amountConverter(accountDetails?.totalDepositBalance ?? 0),
    },
    {
      title: 'Remaining Payable Amount',
      value: amountConverter(accountDetails?.totalDepositBalance ?? 0),
    },
  ];

  return (
    <>
      <TabHeader heading="Overview" />

      <DetailPageQuickLinks links={links} />

      <Statistics statsData={accountSummary} />

      <GeneralInfoCard title="General Information" items={generalInfos} />

      <BalanceChart />

      <RecentTransactions />

      <UpcomingPayments />

      <GeneralInfoCard title="Additional Features" items={additionalFeatures} />
    </>
  );
};
