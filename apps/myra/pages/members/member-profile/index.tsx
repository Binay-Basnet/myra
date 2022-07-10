import React, { ReactElement } from 'react';

import { MemberPagesLayout } from '@coop/cbs/members/list';
import { ProfileFeature } from '@coop/cbs/members/profile';
import { MainLayout } from '@coop/shared/ui';

const MemberProfile = () => {
  return <ProfileFeature />;
};

MemberProfile.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <MemberPagesLayout>{page}</MemberPagesLayout>
    </MainLayout>
  );
};

export default MemberProfile;
