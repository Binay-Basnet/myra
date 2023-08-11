import { ReactElement } from 'react';

import { BPMLayout, BPMRequestsSidebarLayout } from '@coop/bpm/ui-layouts';
import { LoanList } from '@coop/cbs/loan/lists';

const LoanApplicationListPage = () => <LoanList />;

LoanApplicationListPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <BPMLayout>
      <BPMRequestsSidebarLayout>{page}</BPMRequestsSidebarLayout>
    </BPMLayout>
  );
};
export default LoanApplicationListPage;
