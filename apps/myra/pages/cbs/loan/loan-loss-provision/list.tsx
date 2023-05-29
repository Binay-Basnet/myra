import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { LoanListLayout } from '@coop/cbs/loan/layouts';
import { LoanProvisionList } from '@coop/cbs/loan/loan-loss-provision';

const LoanLossProvisionListPage = () => <LoanProvisionList />;

export default LoanLossProvisionListPage;

LoanLossProvisionListPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <LoanListLayout>
        <Scrollable>{page}</Scrollable>
      </LoanListLayout>
    </MainLayout>
  );
};
