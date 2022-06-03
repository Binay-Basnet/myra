import { ReactElement } from 'react';
import { MemberPagesLayout, MemberTable } from '@saccos/myra/components';
import { MainLayout } from '@saccos/myra/ui';

const MemberListPage = () => {
  return <MemberTable />;
};

MemberListPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <MemberPagesLayout>{page}</MemberPagesLayout>{' '}
    </MainLayout>
  );
};

export default MemberListPage;
