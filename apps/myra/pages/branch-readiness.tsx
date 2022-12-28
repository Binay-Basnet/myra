import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { BranchReadiness } from '@coop/cbs/close-day';

const BranchReadinessPage = () => <BranchReadiness />;

BranchReadinessPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
export default BranchReadinessPage;
