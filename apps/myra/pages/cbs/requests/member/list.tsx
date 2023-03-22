import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { RequestListLayout } from '@coop/cbs/requests/layout';
import { MemberRequestPage } from '@coop/cbs/requests/lists';

const MemberRequestNextPage = () => <MemberRequestPage />;

export default MemberRequestNextPage;

MemberRequestNextPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <RequestListLayout>{page}</RequestListLayout>
    </MainLayout>
  );
};
