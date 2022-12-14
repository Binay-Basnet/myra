import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { MemberListPage as MemberList, MemberPagesLayout } from '@coop/cbs/members/list';

const MemberListPage = () => <MemberList />;

MemberListPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <MemberPagesLayout>{page}</MemberPagesLayout>{' '}
    </MainLayout>
  );
};

export default MemberListPage;
