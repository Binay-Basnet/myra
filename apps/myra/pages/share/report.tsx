import { ReactElement } from 'react';
import { SharePageLayout, ShareRegisterTable } from '@saccos/myra/components';
import { MainLayout } from '@saccos/myra/ui';

// TODO ( UPDATE THIS PAGE A/C TO DESIGN )
const ShareReport = () => {
  return <ShareRegisterTable />;
};

ShareReport.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <SharePageLayout>{page}</SharePageLayout>{' '}
    </MainLayout>
  );
};
export default ShareReport;
