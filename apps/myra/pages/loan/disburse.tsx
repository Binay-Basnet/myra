import { ReactElement } from 'react';

import { Payment } from '@coop/cbs/loan';
import { MainLayout } from '@coop/shared/ui';

const LoanDisburse = () => <Payment />;

LoanDisburse.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
export default LoanDisburse;
