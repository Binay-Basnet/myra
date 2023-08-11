import { ReactElement } from 'react';

import { BPMLayout, BPMRequestsSidebarLayout } from '@coop/bpm/ui-layouts';
import { CBSLoanDetails, LoanDetailsHeader } from '@coop/cbs/loan/details';

const LoanDetailsPage = () => (
  <>
    <LoanDetailsHeader title="Loan Application" />
    <CBSLoanDetails />
  </>
);

LoanDetailsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <BPMLayout>
      <BPMRequestsSidebarLayout>{page}</BPMRequestsSidebarLayout>
    </BPMLayout>
  );
};

export default LoanDetailsPage;
