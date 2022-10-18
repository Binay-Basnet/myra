import { ReactElement } from 'react';

import { DownloadsList } from '@coop/ebanking/coop';
import { EbankingMainLayout } from '@coop/ebanking/ui-layout';

const CoopGuideLines = () => <DownloadsList category="Guidelines" />;

CoopGuideLines.getLayout = (page: ReactElement) => <EbankingMainLayout>{page}</EbankingMainLayout>;

export default CoopGuideLines;
