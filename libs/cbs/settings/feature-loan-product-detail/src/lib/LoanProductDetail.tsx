import { useRouter } from 'next/router';

import { DetailPageHeader } from '@myra-ui';

import { featureCode } from '@coop/shared/utils';

import { AccountListPage } from './AccountListPage';
import GeneralUpdatesPage from './GeneralUpdatesPage';
import { InactiveLoanAccountListPage } from './InactiveAccountsList';
import { InterestBreakdownPage } from './InterestBreakdownPage';
import { InterestUpdatePage } from './InteretUpdatePage';
import LoanFeesAndChargesUpdatePage from './LoanFeesAndChargesUpdatePage';
import { LoanPenaltyUpdatePage } from './LoanPenaltyUpdatePage';
import { LoanRebateUpdatePage } from './LoanRebateUpdatePage';
import { OverviewPage } from './OverviewPage';
import { useLoanProductDepositHook } from '../hooks/useLoanProductDepositHook';

/* eslint-disable-next-line */
export interface LoanProductDetailProps {}

export const LoanProductDetail = () => {
  const router = useRouter();
  const { sidebarData } = useLoanProductDepositHook();

  const tabQuery = router.query['tab'] as string;

  return (
    <>
      <DetailPageHeader
        name={sidebarData?.productName ?? ''}
        title={`Loan Product - ${featureCode.loanProductDetail}`}
      />
      {(tabQuery === 'overview' || tabQuery === 'undefined' || !tabQuery) && <OverviewPage />}
      {tabQuery === 'account list' && <AccountListPage />}
      {tabQuery === 'active accounts' && <AccountListPage />}
      {tabQuery === 'inactive accounts' && <InactiveLoanAccountListPage />}
      {tabQuery === 'product premium' && <InterestUpdatePage />}
      {tabQuery === 'penalty update' && <LoanPenaltyUpdatePage />}
      {tabQuery === 'rebate update' && <LoanRebateUpdatePage />}
      {tabQuery === 'fee and charges update' && <LoanFeesAndChargesUpdatePage />}
      {tabQuery === 'general updates' && <GeneralUpdatesPage />}
      {tabQuery === 'interest breakdown' && <InterestBreakdownPage />}
    </>
  );
};
