import { ReactElement } from 'react';
import { MemberPagesLayout, MemberTable } from '@coop/myra/components';
import { MainLayout } from '@coop/shared/ui';

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
