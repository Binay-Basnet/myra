import { ReactElement } from 'react';
import { SchedulingList } from '@fam/feature-operation';
import { FamLayout, OperationSidebarLayout } from '@fam/layouts';

export const SchedulingListPage = () => <SchedulingList />;

SchedulingListPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <FamLayout>
      <OperationSidebarLayout>{page}</OperationSidebarLayout>
    </FamLayout>
  );
};

export default SchedulingListPage;
