import { ReactElement } from 'react';

import { MemberListPage, MemberPagesLayout } from '@coop/cbs/members/list';
import { MainLayout } from '@coop/shared/ui';

const MemberReportPage = () => {
  return <MemberListPage />;
};

MemberReportPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <MemberPagesLayout>{page}</MemberPagesLayout>{' '}
    </MainLayout>
  );
};

export default MemberReportPage;
