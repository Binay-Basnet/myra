import { ReactElement } from 'react';
import { GroupAdd } from '@cbs/microfinance';

import { MainLayout } from '@myra-ui';

import { Can } from '@coop/cbs/utils';

export const GroupAddPage = () => (
  <Can I="SHOW_IN_MENU" a="CBS_SHARE_SHARE_BALANCE" showError>
    <GroupAdd />
  </Can>
);

GroupAddPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default GroupAddPage;
