import { DetailPageQuickLinks } from '@myra-ui';

import {
  GeneralInfoCard,
  RecentTransactions,
  Statistics,
  TabHeader,
  UpcomingPayments,
} from '../component';
import { useLoanAccountDetailHooks } from '../hooks/useLoanAccountDetailHooks';

export const OverviewPage = () => {
  const { generalInfoCardData, transactionList, accountSummary, additionalFeatures, paymentList } =
    useLoanAccountDetailHooks();

  const links = [
    {
      title: 'Loan Repayment',
      link: `/loan/repayments/add`,
    },
  ];

  return (
    <>
      <TabHeader heading="Overview" />

      <DetailPageQuickLinks links={links} />

      <Statistics statsData={accountSummary} />

      <GeneralInfoCard title="General Information" items={generalInfoCardData} />

      <UpcomingPayments paymentList={paymentList} />

      <RecentTransactions txnList={transactionList} />

      <GeneralInfoCard title="Additional Features" items={additionalFeatures} />
    </>
  );
};
