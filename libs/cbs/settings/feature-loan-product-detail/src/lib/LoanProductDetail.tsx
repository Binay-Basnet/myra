import { useRouter } from 'next/router';

import { ProductDetailPathBar } from '@coop/cbs/settings/ui-layout';

import { AccountListPage } from './AccountListPage';
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
      <ProductDetailPathBar name={sidebarData?.productName ?? ''} title="Loan Product" />
      {(tabQuery === 'overview' || tabQuery === 'undefined' || !tabQuery) && <OverviewPage />}
      {tabQuery === 'account list' && <AccountListPage />}
    </>
  );
};
