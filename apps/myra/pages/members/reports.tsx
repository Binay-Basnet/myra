import { ReactElement } from 'react';
import { MemberPagesLayout, MemberTable } from '@saccos/myra/components';
import { MainLayout } from '@saccos/myra/ui';

const MemberReportPage = () => {
  return <MemberTable />;
};

MemberReportPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <MemberPagesLayout mainTitle="Member Reports">{page}</MemberPagesLayout>{' '}
    </MainLayout>
  );
};

export default MemberReportPage;
