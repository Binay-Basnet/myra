import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { RequestListLayout } from '@coop/cbs/requests/layout';
import { MemberTransferList } from '@coop/cbs/requests/lists';

const MemberTansferPage = () => <MemberTransferList />;

export default MemberTansferPage;

MemberTansferPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <RequestListLayout>{page}</RequestListLayout>
    </MainLayout>
  );
};
