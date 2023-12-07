import { ReactElement } from 'react';
import { CenterAdd } from '@cbs/microfinance';

import { MainLayout } from '@myra-ui';

import { Can } from '@coop/cbs/utils';

export const CenterAddPage = () => (
  <Can I="SHOW_IN_MENU" a="CBS_SHARE_SHARE_BALANCE" showError>
    <CenterAdd />
  </Can>
);

CenterAddPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default CenterAddPage;
