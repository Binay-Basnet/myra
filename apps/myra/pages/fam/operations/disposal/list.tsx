import { ReactElement } from 'react';
import { DisposalList } from '@fam/feature-operation';
import { FamLayout, OperationSidebarLayout } from '@fam/layouts';

export const DisposalListPage = () => <DisposalList />;

DisposalListPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <FamLayout>
      <OperationSidebarLayout>{page}</OperationSidebarLayout>
    </FamLayout>
  );
};

export default DisposalListPage;
