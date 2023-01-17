import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { COAListView } from '@coop/cbs/settings/coa';
import { TransactionPageHeader } from '@coop/cbs/transactions/ui-components';
import { TransactionsSidebarLayout } from '@coop/cbs/transactions/ui-layouts';
import { featureCode } from '@coop/shared/utils';

const AllLedgerList = () => (
  <>
    <TransactionPageHeader heading={`All Ledgers - ${featureCode?.coaList}`} />
    <COAListView />
  </>
);

AllLedgerList.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <TransactionsSidebarLayout>{page}</TransactionsSidebarLayout>
    </MainLayout>
  );
};
export default AllLedgerList;
