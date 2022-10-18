import { ReactElement } from 'react';

import { DownloadsList } from '@coop/ebanking/coop';
import { EbankingMainLayout } from '@coop/ebanking/ui-layout';

const COOPFormDownloadsPage = () => <DownloadsList category="Forms" />;

COOPFormDownloadsPage.getLayout = (page: ReactElement) => (
  <EbankingMainLayout>{page}</EbankingMainLayout>
);

export default COOPFormDownloadsPage;
