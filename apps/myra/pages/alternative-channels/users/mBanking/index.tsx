import { ReactElement } from 'react';

import { ACMainLayout, UserLayout } from '@coop/ac/layouts';
import { MobileBankingUsersList } from '@coop/ac/lists';

const MBankingListPage = () => <MobileBankingUsersList />;

MBankingListPage.getLayout = (page: ReactElement) => (
  <ACMainLayout>
    <UserLayout>{page}</UserLayout>
  </ACMainLayout>
);

export default MBankingListPage;
