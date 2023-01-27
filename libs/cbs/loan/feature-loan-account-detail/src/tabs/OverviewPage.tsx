import { Alert, DetailPageQuickLinks } from '@myra-ui';

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
    isClosed,
    generalInfo,
    memberDetails,
    paymentAllList,
  } = useLoanAccountDetailHooks();

  const links = [
    {
      title: 'Loan Repayment',
      link: `${ROUTES.CBS_LOAN_REPAYMENTS_ADD}?redirectMemberId=${memberDetails?.memberId}&loanAccountId=${generalInfo?.accountId}`,
    },
  ];

  return (
    <>
      <TabHeader heading="Overview" />

      {!isClosed && <DetailPageQuickLinks links={links} />}
      {isClosed && <Alert status="error" subtitle="This Account is Closed" />}

      <Statistics statsData={accountSummary} />

      <GeneralInfoCard
        title="General Information"
        items={generalInfoCardData}
        productId={productId}
      />

      {!isClosed && <UpcomingPayments paymentList={paymentList} allList={paymentAllList} />}

      <RecentTransactions txnList={transactionList} isClosed={isClosed} />

      <GeneralInfoCard title="Additional Features" items={additionalFeatures} />
    </>
  );
};
