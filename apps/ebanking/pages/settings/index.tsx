import { ReactElement } from 'react';

import { EbankingFeatureSettings } from '@coop/ebanking/settings';
import { EbankingMainLayout } from '@coop/ebanking/ui-layout';

const SettingsPage = () => <EbankingFeatureSettings />;

SettingsPage.getLayout = (page: ReactElement) => <EbankingMainLayout>{page}</EbankingMainLayout>;

export default SettingsPage;
