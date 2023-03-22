import { ReactElement } from 'react';
import { useRouter } from 'next/router';

import { MainLayout, Scrollable } from '@myra-ui';

import { COAAccountDetail, COALeafDetail } from '@coop/cbs/settings/coa';
import { TransactionsSidebarLayout } from '@coop/cbs/transactions/ui-layouts';

const COADetailPage = () => {
  const router = useRouter();

  const { id } = router.query;

  if (id?.includes('-')) {
    return <COAAccountDetail />;
  }
  return <COALeafDetail />;
};

COADetailPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <TransactionsSidebarLayout>{page}</TransactionsSidebarLayout>
    </MainLayout>
  );
};
export default COADetailPage;
