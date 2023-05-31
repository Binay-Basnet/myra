import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { ExternalLoanReport } from '@coop/cbs/reports';

export const AccountingExternalLoanStatementPage = () => <ExternalLoanReport />;

export default AccountingExternalLoanStatementPage;

AccountingExternalLoanStatementPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};
