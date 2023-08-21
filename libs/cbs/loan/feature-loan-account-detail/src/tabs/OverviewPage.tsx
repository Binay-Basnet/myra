import { AiOutlineFileText } from 'react-icons/ai';

import { Alert, DetailPageQuickLinks } from '@myra-ui';

import { localizedDate, ROUTES } from '@coop/cbs/utils';

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
    productId,
    isClosed,
    generalInfo,
    memberDetails,
    isLocAccount,
    locAccountSummary,
    overviewData,
  } = useLoanAccountDetailHooks();

  const links = [
    {
      title: 'Loan Repayment',
      link: `${ROUTES.CBS_LOAN_REPAYMENTS_ADD}?memberId=${memberDetails?.memberId}&loanAccountId=${generalInfo?.accountId}`,
    },
    {
      title: 'Loan Statement',
      link: `${ROUTES.CBS_REPORTS_LOAN_ACCOUNT_STATEMENT_REPORT}?memberId=${memberDetails?.memberId}&loanAccountId=${generalInfo?.accountId}`,
      icon: AiOutlineFileText,
    },
  ];

  return (
    <>
      <TabHeader heading="Overview" />

      {!isClosed && <DetailPageQuickLinks links={links} />}
      {isClosed && (
        <Alert
          status="error"
          subtitle={
            overviewData?.closedDate?.local
              ? `This account is closed at ${localizedDate(overviewData?.closedDate)}`
              : 'This Account is Closed'
          }
          hideCloseIcon
        />
      )}

      <Statistics statsData={isLocAccount ? locAccountSummary : accountSummary} />

      <GeneralInfoCard
        title="General Information"
        items={generalInfoCardData}
        productId={productId}
      />

      {!isClosed && <UpcomingPayments />}

      <RecentTransactions txnList={transactionList} isClosed={isClosed} />

      <GeneralInfoCard title="Additional Features" items={additionalFeatures} />
    </>
  );
};
