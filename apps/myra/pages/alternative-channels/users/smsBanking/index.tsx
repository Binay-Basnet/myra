import { ReactElement } from 'react';

import { ACMainLayout, UserLayout } from '@coop/ac/layouts';
import { SMSBankingUsersList } from '@coop/ac/lists';

const SMSBankingListPage = () => <SMSBankingUsersList />;

SMSBankingListPage.getLayout = (page: ReactElement) => (
  <ACMainLayout>
    <UserLayout>{page}</UserLayout>
  </ACMainLayout>
);

export default SMSBankingListPage;
