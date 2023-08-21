import { ReactElement } from 'react';

import { BPMLayout, BPMRequestsSidebarLayout } from '@coop/bpm/ui-layouts';
import { CBSLoanApprove } from '@coop/cbs/loan/details';

const ApproveLoan = () => <CBSLoanApprove />;

ApproveLoan.getLayout = function getLayout(page: ReactElement) {
  return (
    <BPMLayout>
      <BPMRequestsSidebarLayout>{page}</BPMRequestsSidebarLayout>
    </BPMLayout>
  );
};

export default ApproveLoan;
