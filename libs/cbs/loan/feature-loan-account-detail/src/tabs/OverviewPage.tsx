import { DetailPageQuickLinks } from '@myra-ui';

import { ROUTES } from '@coop/cbs/utils';

import {
  GeneralInfoCard,
  RecentTransactions,
  Statistics,
  TabHeader,
  UpcomingPayments,
} from '../component';
import { useLoanAccountDetailHooks } from '../hooks/useLoanAccountDetailHooks';

export const OverviewPage = () => {
  const {
    generalInfoCardData,
    transactionList,
    accountSummary,
    additionalFeatures,
    paymentList,
    productId,
  } = useLoanAccountDetailHooks();

  const links = [
    {
      title: 'Loan Repayment',
      link: ROUTES.CBS_LOAN_REPAYMENTS_ADD,
    },
  ];

  return (
    <>
      <TabHeader heading="Overview" />

      <DetailPageQuickLinks links={links} />

      <Statistics statsData={accountSummary} />

      <GeneralInfoCard
        title="General Information"
        items={generalInfoCardData}
        productId={productId}
      />

      <UpcomingPayments paymentList={paymentList} />

      <RecentTransactions txnList={transactionList} />

      <GeneralInfoCard title="Additional Features" items={additionalFeatures} />
    </>
  );
};
