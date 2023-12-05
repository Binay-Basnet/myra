import { ReactElement } from 'react';
import { MicrofinanceLayout } from '@micro-finance';

import { MainLayout } from '@myra-ui';

import { Can } from '@coop/cbs/utils';

export const GroupMeetingsAddPage = () => {
  <Can I="SHOW_IN_MENU" a="CBS_SHARE_SHARE_BALANCE" showError>
    gg it is
  </Can>;
};

GroupMeetingsAddPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <MicrofinanceLayout>{page}</MicrofinanceLayout>{' '}
    </MainLayout>
  );
};

export default GroupMeetingsAddPage;
