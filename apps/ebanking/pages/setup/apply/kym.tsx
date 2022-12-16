import { ReactElement } from 'react';

import { CoopKYMPage } from '@coop/ebanking/auth';
import { EbankingEmptyLayout } from '@coop/ebanking/ui-layout';

const CoopConnectNextPage = () => <CoopKYMPage />;

export default CoopConnectNextPage;

CoopConnectNextPage.getLayout = (page: ReactElement) => (
  <EbankingEmptyLayout>{page}</EbankingEmptyLayout>
);
