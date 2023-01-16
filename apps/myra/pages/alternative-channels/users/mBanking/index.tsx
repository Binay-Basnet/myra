import { ReactElement } from 'react';

import { ACMainLayout, UserLayout } from '@coop/ac/layouts';
import { MobileBankingUsersList } from '@coop/ac/lists';
import { Can } from '@coop/cbs/utils';

const MBankingListPage = () => (
  <Can I="SHOW_IN_MENU" a="ALTERNATIVE_CHANNELS_MOBILE_BANKING_REGISTRATION" showError>
    <MobileBankingUsersList />
  </Can>
);

MBankingListPage.getLayout = (page: ReactElement) => (
  <ACMainLayout>
    <UserLayout>{page}</UserLayout>
  </ACMainLayout>
);

export default MBankingListPage;
