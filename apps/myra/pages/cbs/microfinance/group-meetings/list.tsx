import { ReactElement } from 'react';
import { GroupMeetingsAdd } from '@cbs/microfinance';
import { MicrofinanceLayout } from '@micro-finance';

import { MainLayout } from '@myra-ui';

import { Can } from '@coop/cbs/utils';

export const CenterListPage = () => {
  <Can I="SHOW_IN_MENU" a="CBS_SHARE_SHARE_BALANCE" showError>
    <GroupMeetingsAdd />
  </Can>;
};

CenterListPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <MicrofinanceLayout>{page}</MicrofinanceLayout>{' '}
    </MainLayout>
  );
};

export default CenterListPage;
