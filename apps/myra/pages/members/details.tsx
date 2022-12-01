import { ReactElement } from 'react';
import { MainLayout } from '@myra-ui';

import { MemberDetails } from '@coop/cbs/members/details';
import { MemberPagesLayout } from '@coop/cbs/members/list';

const MemberDEtailsPage = () => <MemberDetails />;

MemberDEtailsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <MemberPagesLayout>{page}</MemberPagesLayout>{' '}
    </MainLayout>
  );
};

export default MemberDEtailsPage;
