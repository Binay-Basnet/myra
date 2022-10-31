import { ReactElement } from 'react';

import { EbankingChangeCoopPin } from '@coop/ebanking/settings';
import { EbankingMainLayout } from '@coop/ebanking/ui-layout';

const SettingsProfilePage = () => <EbankingChangeCoopPin />;

SettingsProfilePage.getLayout = (page: ReactElement) => (
  <EbankingMainLayout>{page}</EbankingMainLayout>
);

export default SettingsProfilePage;
