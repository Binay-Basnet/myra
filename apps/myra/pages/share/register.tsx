import { ReactElement } from 'react';
import { SharePageLayout, ShareRegisterTable } from '@saccos/myra/components';
import { MainLayout } from '@saccos/myra/ui';

// TODO ( Update this page when design arrives )
const ShareRegister = () => {
  return <ShareRegisterTable />;
};

ShareRegister.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <SharePageLayout>{page}</SharePageLayout>{' '}
    </MainLayout>
  );
};
export default ShareRegister;
