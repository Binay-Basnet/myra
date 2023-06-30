import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { MemberDormantForm } from '@coop/members/dormancy';

export const MemberDormantPage = () => <MemberDormantForm />;

MemberDormantPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};

export default MemberDormantPage;
