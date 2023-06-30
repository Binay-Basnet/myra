import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { CbsMemberFeatureInactivations } from '@coop/members/activations';

export const MemberActivationPage = () => <CbsMemberFeatureInactivations />;

MemberActivationPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default MemberActivationPage;
