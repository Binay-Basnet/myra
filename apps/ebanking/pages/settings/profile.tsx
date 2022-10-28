import { ReactElement } from 'react';

import { EBankingSettingsProfile } from '@coop/ebanking/settings';
import { EbankingMainLayout } from '@coop/ebanking/ui-layout';

const SettingsProfilePage = () => <EBankingSettingsProfile />;

SettingsProfilePage.getLayout = (page: ReactElement) => (
  <EbankingMainLayout>{page}</EbankingMainLayout>
);

export default SettingsProfilePage;
