import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { MemberInactiveListPage, MemberPagesLayout } from '@coop/cbs/members/list';
import { Can } from '@coop/cbs/utils';

const InactiveListPage = () => (
  <Can I="SHOW_IN_MENU" a="CBS_MEMBERS_MEMBER" showError isErrorCentered>
    <MemberInactiveListPage />
  </Can>
);

InactiveListPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <MemberPagesLayout>{page}</MemberPagesLayout>
    </MainLayout>
  );
};

export default InactiveListPage;
