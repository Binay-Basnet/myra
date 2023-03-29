import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { CbsLoanFeatureLoanSwitch } from '@coop/loan/accounts/switch';

const CollateralAdd = () => <CbsLoanFeatureLoanSwitch />;

export default CollateralAdd;

CollateralAdd.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};
