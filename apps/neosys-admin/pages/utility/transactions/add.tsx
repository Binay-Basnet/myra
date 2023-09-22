import { ReactElement } from 'react';

import { MainLayout } from '@coop/neosys-admin/layout';
import { UtilityTransactionAdd } from '@coop/neosys-admin/utility';

const UtilityTransactionsAddPage = () => <UtilityTransactionAdd />;

UtilityTransactionsAddPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default UtilityTransactionsAddPage;
