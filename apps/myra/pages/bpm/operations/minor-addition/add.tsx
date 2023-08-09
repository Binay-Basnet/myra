import { ReactElement } from 'react';

import { BPMOperationsMinorAdd } from '@coop/bpm/operations';
import { BPMLayout } from '@coop/bpm/ui-layouts';

// TODO ( Update this page when design arrives )
const BPMOPERASTIONSADDMINORPAGE = () => <BPMOperationsMinorAdd />;

BPMOPERASTIONSADDMINORPAGE.getLayout = function getLayout(page: ReactElement) {
  return <BPMLayout>{page}</BPMLayout>;
};
export default BPMOPERASTIONSADDMINORPAGE;
