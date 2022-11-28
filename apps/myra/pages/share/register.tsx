import { ReactElement } from 'react';

import { SharePageLayout, ShareRegisterTable } from '@coop/myra/components';
import { MainLayout } from '@myra-ui';

// TODO ( Update this page when design arrives )
const ShareRegister = () => <ShareRegisterTable />;

ShareRegister.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <SharePageLayout>{page}</SharePageLayout>{' '}
    </MainLayout>
  );
};
export default ShareRegister;
