import { ReactElement } from 'react';

import { ACMainLayout, SMSBankingListLayout } from '@coop/ac/layouts';
import { SMSBankingUsersList } from '@coop/ac/lists';

const SMSBankingListPage = () => <SMSBankingUsersList />;

SMSBankingListPage.getLayout = (page: ReactElement) => (
  <ACMainLayout>
    <SMSBankingListLayout>{page}</SMSBankingListLayout>
  </ACMainLayout>
);

export default SMSBankingListPage;
