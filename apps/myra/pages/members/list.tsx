import { ReactElement } from 'react';

import {
  MemberListPage as MemberList,
  MemberPagesLayout,
} from '@coop/cbs/members/list';
import { MainLayout } from '@coop/shared/ui';

const MemberListPage = () => <MemberList />;

MemberListPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <MemberPagesLayout>{page}</MemberPagesLayout>{' '}
    </MainLayout>
  );
};

export default MemberListPage;
