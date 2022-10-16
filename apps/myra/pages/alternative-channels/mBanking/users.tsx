import { ReactElement } from 'react';

import { ACMainLayout, MobileBankingListLayout } from '@coop/ac/layouts';
import { MobileBankingUsersList } from '@coop/ac/lists';

const MBankingListPage = () => <MobileBankingUsersList />;

MBankingListPage.getLayout = (page: ReactElement) => (
  <ACMainLayout>
    <MobileBankingListLayout>{page}</MobileBankingListLayout>
  </ACMainLayout>
);

export default MBankingListPage;
