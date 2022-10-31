import { ReactElement } from 'react';

import { EbankingChangePassword } from '@coop/ebanking/settings';
import { EbankingMainLayout } from '@coop/ebanking/ui-layout';

const SettingsProfilePage = () => <EbankingChangePassword />;

SettingsProfilePage.getLayout = (page: ReactElement) => (
  <EbankingMainLayout>{page}</EbankingMainLayout>
);

export default SettingsProfilePage;
