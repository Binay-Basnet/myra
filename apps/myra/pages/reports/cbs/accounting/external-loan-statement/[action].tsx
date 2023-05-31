import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { ExternalLoanStatementReport } from '@coop/cbs/reports';

export const AccountingExternalLoanStatementPage = () => <ExternalLoanStatementReport />;

export default AccountingExternalLoanStatementPage;

AccountingExternalLoanStatementPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};
