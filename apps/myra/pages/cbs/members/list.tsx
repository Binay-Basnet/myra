import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { MemberListPage as MemberList, MemberPagesLayout } from '@coop/cbs/members/list';
import { Can } from '@coop/cbs/utils';

const MemberListPage = () => (
  <>
    <Can I="VIEW" a="CBS_MEMBERS_MEMBER">
      <MemberList />
    </Can>
    <Can not I="VIEW" a="CBS_MEMBERS_MEMBER">
      Fuck you
    </Can>
  </>
);

MemberListPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <MemberPagesLayout>{page}</MemberPagesLayout>{' '}
    </MainLayout>
  );
};

export default MemberListPage;
