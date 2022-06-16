import React, { ReactElement } from 'react';

import { ProfileFeature } from '@coop/cbs/members/profile';
import { MemberPagesLayout } from '@coop/myra/components';
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
