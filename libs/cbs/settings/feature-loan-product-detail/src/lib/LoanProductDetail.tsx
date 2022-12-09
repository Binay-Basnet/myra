import { useRouter } from 'next/router';

import { AccountListPage } from './AccountListPage';
import { OverviewPage } from './OverviewPage';

/* eslint-disable-next-line */
export interface LoanProductDetailProps {}

export const LoanProductDetail = () => {
  const router = useRouter();

  const tabQuery = router.query['tab'] as string;

  return (
    <>
      {(tabQuery === 'overview' || tabQuery === 'undefined' || !tabQuery) && <OverviewPage />}
      {tabQuery === 'account list' && <AccountListPage />}
    </>
  );
};
