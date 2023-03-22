import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { CbsMemberFeatureInactivations } from '@coop/members/activations';

export const MemberActivationPage = () => <CbsMemberFeatureInactivations />;

MemberActivationPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};

export default MemberActivationPage;
