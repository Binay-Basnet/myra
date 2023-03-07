import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { CbsLoanFeatureLoanSwitch } from '@coop/loan/accounts/switch';

const LoanSwitchCollateral = () => <CbsLoanFeatureLoanSwitch />;

export default LoanSwitchCollateral;

LoanSwitchCollateral.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
