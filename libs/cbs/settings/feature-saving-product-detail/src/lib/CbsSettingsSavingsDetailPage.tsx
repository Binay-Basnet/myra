import { useRouter } from 'next/router';

import { ProductDetailPathBar } from '@coop/cbs/settings/ui-layout';

import { AccountListPage } from './AccountListPage';
import { OverviewPage } from './OverviewPage';
import { useSavingDepositHook } from '../hooks/useSavingDepositHook';

export const CbsSettingsSavingsDetailPage = () => {
  const router = useRouter();
  const { sidebarData } = useSavingDepositHook();

  const tabQuery = router.query['tab'] as string;

  return (
    <>
      <ProductDetailPathBar name={sidebarData?.productName ?? ''} title="Savings Product" />
      {(tabQuery === 'overview' || tabQuery === 'undefined' || !tabQuery) && <OverviewPage />}
      {tabQuery === 'account list' && <AccountListPage />}

      {/* {tabQuery && !['tasks', 'documents', 'activity'].includes(tabQuery) && (
        <Box h="calc(100vh - 110px)">
          <WIPState />
        </Box>
      )} */}
    </>
  );
};
