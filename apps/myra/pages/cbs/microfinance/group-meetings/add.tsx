import { ReactElement } from 'react';
import { GroupMeetingsAdd } from '@cbs/microfinance';

import { MainLayout } from '@myra-ui';

import { Can } from '@coop/cbs/utils';

export const GroupMeetingsAddPage = () => {
  <Can I="SHOW_IN_MENU" a="CBS_SHARE_SHARE_BALANCE" showError>
    <GroupMeetingsAdd />
  </Can>;
};

GroupMeetingsAddPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default GroupMeetingsAddPage;
