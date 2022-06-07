import { ReactElement } from 'react';
import { MemberPagesLayout, MemberTable } from '@coop/myra/components';
import { MainLayout } from '@coop/myra/ui';

const MemberReportPage = () => {
  return <MemberTable />;
};

MemberReportPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <MemberPagesLayout>{page}</MemberPagesLayout>{' '}
    </MainLayout>
  );
};

export default MemberReportPage;
