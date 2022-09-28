import { ReactElement } from 'react';

import { EBankingFeatureAllChequeRequests } from '@coop/ebanking/coop';
import { EbankingMainLayout } from '@coop/ebanking/ui-layout';

const COOPAllChequePage = () => <EBankingFeatureAllChequeRequests />;

COOPAllChequePage.getLayout = function (page: ReactElement) {
  return <EbankingMainLayout>{page}</EbankingMainLayout>;
};

export default COOPAllChequePage;
