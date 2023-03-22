import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { MemberListPage as MemberList, MemberPagesLayout } from '@coop/cbs/members/list';
import { Can } from '@coop/cbs/utils';

const MemberListPage = () => (
  <Can I="SHOW_IN_MENU" a="CBS_MEMBERS_MEMBER" showError isErrorCentered>
    <MemberList />
  </Can>
);

MemberListPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <MemberPagesLayout>{page}</MemberPagesLayout>{' '}
    </MainLayout>
  );
};

export default MemberListPage;
