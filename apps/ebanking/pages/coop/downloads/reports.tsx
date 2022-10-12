import { ReactElement } from 'react';

import { DownloadsList } from '@coop/ebanking/coop';
import { EbankingMainLayout } from '@coop/ebanking/ui-layout';

const CoopReports = () => <DownloadsList category="Reports" />;

CoopReports.getLayout = (page: ReactElement) => <EbankingMainLayout>{page}</EbankingMainLayout>;

export default CoopReports;
