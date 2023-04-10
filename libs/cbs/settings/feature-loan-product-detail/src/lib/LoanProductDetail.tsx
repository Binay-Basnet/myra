import { useState } from 'react';
import { useRouter } from 'next/router';

import { DetailPageHeader } from '@myra-ui';

import { featureCode } from '@coop/shared/utils';

import { AccountListPage } from './AccountListPage';
import { InactiveLoanAccountListPage } from './InactiveAccountsList';
import { InterestUpdatePage } from './InteretUpdatePage';
import { OverviewPage } from './OverviewPage';
import UpdateBalanceLimitModal from '../components/LoanDetailsUpdateBalanceLimitModal';
import { useLoanProductDepositHook } from '../hooks/useLoanProductDepositHook';

/* eslint-disable-next-line */
export interface LoanProductDetailProps {}

export const LoanProductDetail = () => {
  const [isUpdateBalanceLimitOpen, setIsUpdateBalanceLimitOpen] = useState(false);
  const router = useRouter();
  const { sidebarData } = useLoanProductDepositHook();

  const tabQuery = router.query['tab'] as string;

  const handleUpdateBalanceLimitModalClose = () => {
    setIsUpdateBalanceLimitOpen(false);
  };

  return (
    <>
      <DetailPageHeader
        name={sidebarData?.productName ?? ''}
        title={`Loan Product - ${featureCode.loanProductDetail}`}
        options={[{ label: 'Update Loan Limit', handler: () => setIsUpdateBalanceLimitOpen(true) }]}
      />
      {(tabQuery === 'overview' || tabQuery === 'undefined' || !tabQuery) && <OverviewPage />}
      {tabQuery === 'account list' && <AccountListPage />}
      {tabQuery === 'interest update' && <InterestUpdatePage />}
      {tabQuery === 'active accounts' && <AccountListPage />}
      {tabQuery === 'inactive accounts' && <InactiveLoanAccountListPage />}
      <UpdateBalanceLimitModal
        isOpen={isUpdateBalanceLimitOpen as boolean}
        onClose={handleUpdateBalanceLimitModalClose as () => void}
      />
    </>
  );
};
