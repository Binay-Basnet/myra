import { ReactElement } from 'react';

import { EbankingFeatureCoop } from '@coop/ebanking/coop';
import { EbankingMainLayout } from '@coop/ebanking/ui-layout';

const COOPHomePage = () => {
  return <EbankingFeatureCoop />;
};

COOPHomePage.getLayout = function (page: ReactElement) {
  return <EbankingMainLayout>{page}</EbankingMainLayout>;
};

export default COOPHomePage;
