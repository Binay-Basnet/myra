import { ReactElement } from 'react';

import { MemberDetails } from '@coop/cbs/members/details';
import { MemberPagesLayout } from '@coop/cbs/members/list';
import { MainLayout } from '@myra-ui';

const MemberDEtailsPage = () => <MemberDetails />;

MemberDEtailsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <MemberPagesLayout>{page}</MemberPagesLayout>{' '}
    </MainLayout>
  );
};

export default MemberDEtailsPage;
