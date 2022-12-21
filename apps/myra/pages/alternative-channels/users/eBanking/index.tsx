import { ReactElement } from 'react';

import { ACMainLayout, UserLayout } from '@coop/ac/layouts';
import { EbankingUsersList } from '@coop/ac/lists';

const EbankingListPage = () => <EbankingUsersList />;

EbankingListPage.getLayout = (page: ReactElement) => (
  <ACMainLayout>
    <UserLayout>{page}</UserLayout>
  </ACMainLayout>
);

export default EbankingListPage;
