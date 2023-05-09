import { ReactElement } from 'react';

import { AddAccountingOrganization } from '@coop/accounting/ui-components';
import { AccountingLayout } from '@coop/accounting/ui-layouts';

const AddInvestmentAccountPage = () => <AddAccountingOrganization />;

AddInvestmentAccountPage.getLayout = function getLayout(page: ReactElement) {
  return <AccountingLayout>{page}</AccountingLayout>;
};
export default AddInvestmentAccountPage;
