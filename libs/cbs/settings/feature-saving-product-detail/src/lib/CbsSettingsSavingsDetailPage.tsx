import { useState } from 'react';
import { useRouter } from 'next/router';

import { Box, DetailPageHeader } from '@myra-ui';

import { featureCode } from '@coop/shared/utils';

import { AccountListPage } from './AccountListPage';
import { DormantAccountListPage } from './DormantAccountPage';
import { InactiveAccountListPage } from './InactiveAccountPage';
import { InterestUpdatePage } from './InterestUpdatePage';
import { OverviewPage } from './OverviewPage';
import { PenaltyUpdatePage } from './PenaltyUpdatePage';
import UpdateBalanceLimitModal from './UpdateBalanceLimitModal';
import { useSavingDepositHook } from '../hooks/useSavingDepositHook';

export const CbsSettingsSavingsDetailPage = () => {
  const [isUpdateBalanceLimitOpen, setIsUpdateBalanceLimitOpen] = useState(false);
  const router = useRouter();
  const { sidebarData } = useSavingDepositHook();

  const tabQuery = router.query['tab'] as string;

  const handleUpdateBalanceLimitModalClose = () => {
    setIsUpdateBalanceLimitOpen(false);
  };

  return (
    <>
      <Box position="sticky" top="0" zIndex={10}>
        <DetailPageHeader
          title={`Savings Product - ${featureCode.savingProductDetail}`}
          member={{
            name: sidebarData?.productName ?? ('' as string),
          }}
          options={[
            { label: 'Update Balance Limit', handler: () => setIsUpdateBalanceLimitOpen(true) },
          ]}
        />
      </Box>
      {(tabQuery === 'overview' || tabQuery === 'undefined' || !tabQuery) && <OverviewPage />}
      {/* {tabQuery === 'account list' && <AccountListPage />} */}
      {tabQuery === 'interest update' && <InterestUpdatePage />}
      {tabQuery === 'dormant accounts' && <DormantAccountListPage />}
      {tabQuery === 'inactive accounts' && <InactiveAccountListPage />}

      {tabQuery === 'active accounts' && <AccountListPage />}

      {tabQuery === 'penalty update' && <PenaltyUpdatePage />}

      <UpdateBalanceLimitModal
        isOpen={isUpdateBalanceLimitOpen as boolean}
        onClose={handleUpdateBalanceLimitModalClose as () => void}
      />
    </>
  );
};
