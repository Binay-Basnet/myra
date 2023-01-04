import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { SharePageLayout, ShareRegisterTable } from '@coop/myra/components';

// TODO ( Update this page when design arrives )
const ShareRegister = () => <ShareRegisterTable />;

ShareRegister.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <SharePageLayout>{page}</SharePageLayout>
    </MainLayout>
  );
};
export default ShareRegister;
