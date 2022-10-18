import { ReactElement } from 'react';

import { DownloadsList } from '@coop/ebanking/coop';
import { EbankingMainLayout } from '@coop/ebanking/ui-layout';

const CoopDirectives = () => <DownloadsList category="Directives" />;

CoopDirectives.getLayout = (page: ReactElement) => <EbankingMainLayout>{page}</EbankingMainLayout>;

export default CoopDirectives;
