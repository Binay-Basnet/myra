import { ReactElement } from 'react';

import { RequestListLayout } from '@coop/cbs/requests/layout';
import { MemberRequestPage } from '@coop/cbs/requests/lists';
import { MainLayout } from '@myra-ui';

const MemberRequestNextPage = () => <MemberRequestPage />;

export default MemberRequestNextPage;

MemberRequestNextPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <RequestListLayout>{page}</RequestListLayout>
    </MainLayout>
  );
};
