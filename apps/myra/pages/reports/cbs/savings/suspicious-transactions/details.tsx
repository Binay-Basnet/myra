import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { STRDetail } from '@coop/cbs/reports';

export const STRDetailPage = () => <STRDetail />;

export default STRDetailPage;

STRDetailPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};
