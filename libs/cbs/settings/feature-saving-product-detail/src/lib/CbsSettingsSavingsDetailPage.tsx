import { useRouter } from 'next/router';

import { ProductDetailPathBar } from '@coop/cbs/settings/ui-layout';
import { featureCode } from '@coop/shared/utils';

import { AccountListPage } from './AccountListPage';
import { DormantAccountListPage } from './DormantAccountPage';
import { InactiveAccountListPage } from './InactiveAccountPage';
import { InterestUpdatePage } from './InterestUpdatePage';
import { OverviewPage } from './OverviewPage';
import { useSavingDepositHook } from '../hooks/useSavingDepositHook';

export const CbsSettingsSavingsDetailPage = () => {
  const router = useRouter();
  const { sidebarData } = useSavingDepositHook();

  const tabQuery = router.query['tab'] as string;

  return (
    <>
      <ProductDetailPathBar
        name={sidebarData?.productName ?? ''}
        title={`Savings Product - ${featureCode.savingProductDetail}`}
      />
      {(tabQuery === 'overview' || tabQuery === 'undefined' || !tabQuery) && <OverviewPage />}
      {/* {tabQuery === 'account list' && <AccountListPage />} */}
      {tabQuery === 'interest update' && <InterestUpdatePage />}
      {tabQuery === 'dormant accounts' && <DormantAccountListPage />}
      {tabQuery === 'inactive accounts' && <InactiveAccountListPage />}

      {tabQuery === 'active accounts' && <AccountListPage />}
    </>
  );
};
