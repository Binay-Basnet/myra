import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { CbsMembersFeatureActivate } from '@coop/members/activations';

export const MemberActivationPage = () => <CbsMembersFeatureActivate />;

MemberActivationPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default MemberActivationPage;
