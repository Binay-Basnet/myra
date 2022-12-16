import { ReactElement } from 'react';

import { CoopApplyPage } from '@coop/ebanking/auth';
import { EbankingHeaderLayout } from '@coop/ebanking/ui-layout';

const CoopConnectNextPage = () => <CoopApplyPage />;

export default CoopConnectNextPage;

CoopConnectNextPage.getLayout = (page: ReactElement) => (
  <EbankingHeaderLayout>{page}</EbankingHeaderLayout>
);
