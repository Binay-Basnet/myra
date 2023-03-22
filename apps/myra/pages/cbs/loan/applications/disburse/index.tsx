import { ReactElement } from 'react';

import { CBSLoanDisburse } from '@coop/cbs/loan/details';
import { MainLayout, Scrollable } from '@myra-ui';

const DisburseLoan = () => <CBSLoanDisburse />;

DisburseLoan.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};

export default DisburseLoan;
