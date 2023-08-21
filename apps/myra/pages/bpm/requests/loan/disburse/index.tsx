import { ReactElement } from 'react';

import { BPMLayout } from '@coop/bpm/ui-layouts';
import { CBSLoanDisburse } from '@coop/cbs/loan/details';

const DisburseLoan = () => <CBSLoanDisburse />;

DisburseLoan.getLayout = function getLayout(page: ReactElement) {
  return <BPMLayout> {page}</BPMLayout>;
};

export default DisburseLoan;
