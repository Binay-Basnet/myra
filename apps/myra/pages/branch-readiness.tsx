import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { BranchReadiness } from '@coop/cbs/close-day';

const BranchReadinessPage = () => <BranchReadiness />;

BranchReadinessPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};
export default BranchReadinessPage;
