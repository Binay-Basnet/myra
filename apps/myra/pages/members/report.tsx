import { ReactElement } from 'react';

import { MemberListPage, MemberPagesLayout } from '@coop/cbs/members/list';
import { MainLayout } from '@myra-ui';

const MemberReportPage = () => <MemberListPage />;

MemberReportPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <MemberPagesLayout>{page}</MemberPagesLayout>{' '}
    </MainLayout>
  );
};

export default MemberReportPage;
