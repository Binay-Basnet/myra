import { ReactElement } from 'react';
import { useRouter } from 'next/router';

import { MainLayout } from '@myra-ui';

import { COAAccountDetail, COALeafDetail } from '@coop/cbs/settings/coa';
import { TransactionsSidebarLayout } from '@coop/cbs/transactions/ui-layouts';

const COADetailPage = () => {
  const router = useRouter();

  const { id } = router.query;

  if (/^\d+(\.\d+)*$/.test(id as string)) {
    return <COALeafDetail />;
  }

  return <COAAccountDetail />;
};

COADetailPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <TransactionsSidebarLayout>{page}</TransactionsSidebarLayout>
    </MainLayout>
  );
};
export default COADetailPage;
