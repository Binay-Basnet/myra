import { ReactElement } from 'react';

import { ACMainLayout, EBankingListLayout } from '@coop/ac/layouts';
import { EbankingUsersList } from '@coop/ac/lists';

const EbankingListPage = () => <EbankingUsersList />;

EbankingListPage.getLayout = (page: ReactElement) => (
  <ACMainLayout>
    <EBankingListLayout>{page}</EBankingListLayout>
  </ACMainLayout>
);

export default EbankingListPage;
