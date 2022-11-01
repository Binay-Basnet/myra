import { ReactElement } from 'react';

import { CbsMembersFeatureActivate } from '@coop/members/activations';
import { MainLayout } from '@coop/shared/ui';

export const MemberActivationPage = () => <CbsMembersFeatureActivate />;

MemberActivationPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default MemberActivationPage;
