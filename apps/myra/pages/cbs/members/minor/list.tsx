import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { MemberMinorListPage, MemberPagesLayout } from '@coop/cbs/members/list';
import { Can } from '@coop/cbs/utils';

const MinorListPage = () => (
  <Can I="SHOW_IN_MENU" a="CBS_MEMBERS_MEMBER" showError isErrorCentered>
    <MemberMinorListPage />
  </Can>
);

MinorListPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <MemberPagesLayout>{page}</MemberPagesLayout>
    </MainLayout>
  );
};

export default MinorListPage;
