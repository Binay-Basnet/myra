import { ReactElement } from 'react';

import { CoopPinResetPage } from '@coop/ebanking/auth';
import { EbankingHeaderLayout } from '@coop/ebanking/ui-layout';

const CoopConnectPinResetPage = () => <CoopPinResetPage />;

export default CoopConnectPinResetPage;

CoopConnectPinResetPage.getLayout = (page: ReactElement) => (
  <EbankingHeaderLayout>{page}</EbankingHeaderLayout>
);
