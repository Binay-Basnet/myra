import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { CbsMembersFeatureActivate } from '@coop/members/activations';

export const MemberActivationPage = () => <CbsMembersFeatureActivate />;

MemberActivationPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};

export default MemberActivationPage;
