import { ReactElement } from 'react';
import { TaskList } from '@bpm/feature-tasks';

import { BPMLayout, BPMTasksSidebarLayout } from '@coop/bpm/ui-layouts';

// TODO ( Update this page when design arrives )
const TaskListPage = () => <TaskList />;

TaskListPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <BPMLayout>
      <BPMTasksSidebarLayout>{page}</BPMTasksSidebarLayout>
    </BPMLayout>
  );
};
export default TaskListPage;
