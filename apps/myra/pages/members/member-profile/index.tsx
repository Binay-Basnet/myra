import React, { ReactElement } from 'react';
import { MemberPagesLayout } from '@coop/myra/components';
import { MainLayout } from '@coop/shared/ui';
import { ProfileFeature } from '@coop/cbs/members/profile';

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
