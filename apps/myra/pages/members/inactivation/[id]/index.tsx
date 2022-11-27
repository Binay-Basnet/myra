import { ReactElement } from 'react';

import { CbsMemberFeatureInactivations } from '@coop/members/activations';
import { MainLayout } from '@myra-ui';

export const MemberActivationPage = () => <CbsMemberFeatureInactivations />;

MemberActivationPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default MemberActivationPage;
