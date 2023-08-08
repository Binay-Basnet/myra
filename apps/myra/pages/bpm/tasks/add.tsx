import { ReactElement } from 'react';
import { AddTask } from '@bpm/feature-tasks';

import { BPMLayout } from '@coop/bpm/ui-layouts';

// TODO ( Update this page when design arrives )
const TaskAddPage = () => <AddTask />;

TaskAddPage.getLayout = function getLayout(page: ReactElement) {
  return <BPMLayout>{page}</BPMLayout>;
};
export default TaskAddPage;
