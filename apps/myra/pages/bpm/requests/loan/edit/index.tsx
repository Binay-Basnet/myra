import { ReactElement } from 'react';

import { BPMLayout } from '@coop/bpm/ui-layouts';
import { NewLoanApplication } from '@coop/cbs/loan';

const LoanApplicationPage = () => <NewLoanApplication />;

LoanApplicationPage.getLayout = function getLayout(page: ReactElement) {
  return <BPMLayout>{page}</BPMLayout>;
};

export default LoanApplicationPage;
