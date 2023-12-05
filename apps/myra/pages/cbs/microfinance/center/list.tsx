import { ReactElement } from 'react';
import { CenterList } from '@cbs/microfinance';
import { MicrofinanceLayout } from '@micro-finance';

import { MainLayout } from '@myra-ui';

import { Can } from '@coop/cbs/utils';

export const CenterListPage = () => (
  <Can I="SHOW_IN_MENU" a="CBS_SHARE_SHARE_BALANCE" showError>
    <CenterList />
  </Can>
);

CenterListPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <MicrofinanceLayout>{page}</MicrofinanceLayout>{' '}
    </MainLayout>
  );
};

export default CenterListPage;
