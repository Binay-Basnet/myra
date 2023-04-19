import { useRouter } from 'next/router';

import { Box, DetailPageHeader } from '@myra-ui';

import { featureCode } from '@coop/shared/utils';

import { AccountListPage } from './AccountListPage';
import { DormantAccountListPage } from './DormantAccountPage';
import FeesAndChargesUpdatePage from './FeesAndChargesUpdatePage';
import GeneralUpdatesPage from './GeneralUpdatesPage';
import { InactiveAccountListPage } from './InactiveAccountPage';
import { InterestUpdatePage } from './InterestUpdatePage';
import { OverviewPage } from './OverviewPage';
import { PenaltyUpdatePage } from './PenaltyUpdatePage';
import { useSavingDepositHook } from '../hooks/useSavingDepositHook';

export const CbsSettingsSavingsDetailPage = () => {
  const router = useRouter();
  const { sidebarData } = useSavingDepositHook();

  const tabQuery = router.query['tab'] as string;

  return (
    <>
      <Box position="sticky" top="0" zIndex={10}>
        <DetailPageHeader
          title={`Savings Product - ${featureCode.savingProductDetail}`}
          member={{
            name: sidebarData?.productName ?? ('' as string),
          }}
        />
      </Box>
      {(tabQuery === 'overview' || tabQuery === 'undefined' || !tabQuery) && <OverviewPage />}
      {/* {tabQuery === 'account list' && <AccountListPage />} */}
      {tabQuery === 'interest update' && <InterestUpdatePage />}
      {tabQuery === 'dormant accounts' && <DormantAccountListPage />}
      {tabQuery === 'inactive accounts' && <InactiveAccountListPage />}

      {tabQuery === 'active accounts' && <AccountListPage />}

      {tabQuery === 'penalty update' && <PenaltyUpdatePage />}
      {tabQuery === 'fee and charges update' && <FeesAndChargesUpdatePage />}
      {tabQuery === 'general updates' && <GeneralUpdatesPage />}
    </>
  );
};
