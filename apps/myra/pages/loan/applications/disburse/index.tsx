import { ReactElement } from 'react';

import { CBSLoanDisburse } from '@coop/cbs/loan/details';
import { MainLayout } from '@myra-ui';

const DisburseLoan = () => <CBSLoanDisburse />;

DisburseLoan.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default DisburseLoan;
