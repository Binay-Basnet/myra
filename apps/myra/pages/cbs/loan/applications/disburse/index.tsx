import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { CBSLoanDisburse } from '@coop/cbs/loan/details';

const DisburseLoan = () => <CBSLoanDisburse />;

DisburseLoan.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default DisburseLoan;
