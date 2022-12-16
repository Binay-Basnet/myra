import { ReactElement } from 'react';

import { CoopConnectPage } from '@coop/ebanking/auth';
import { EbankingHeaderLayout } from '@coop/ebanking/ui-layout';

const CoopConnectNextPage = () => <CoopConnectPage />;

export default CoopConnectNextPage;

CoopConnectNextPage.getLayout = (page: ReactElement) => (
  <EbankingHeaderLayout>{page}</EbankingHeaderLayout>
);
