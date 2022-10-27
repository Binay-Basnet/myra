import { ReactElement } from 'react';

import { EbankingFeatureSettings } from '@coop/ebanking/settings';
import { EbankingMainLayout } from '@coop/ebanking/ui-layout';

const SettingsProfilePage = () => <EbankingFeatureSettings />;

SettingsProfilePage.getLayout = (page: ReactElement) => (
  <EbankingMainLayout>{page}</EbankingMainLayout>
);

export default SettingsProfilePage;
