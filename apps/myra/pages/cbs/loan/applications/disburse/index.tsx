import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { CBSLoanDisburse } from '@coop/cbs/loan/details';

const DisburseLoan = () => <CBSLoanDisburse />;

DisburseLoan.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};

export default DisburseLoan;
