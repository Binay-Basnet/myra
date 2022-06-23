import { ReactElement } from 'react';

import { SharePageLayout, ShareRegisterTable } from '@coop/myra/components';
import { MainLayout } from '@coop/shared/ui';

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
