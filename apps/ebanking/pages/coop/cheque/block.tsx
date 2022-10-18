import { ReactElement } from 'react';

import { EBankingFeatureBlockChequeRequest } from '@coop/ebanking/coop';
import { EbankingMainLayout } from '@coop/ebanking/ui-layout';

const COOPChequeBlockPage = () => <EBankingFeatureBlockChequeRequest />;

COOPChequeBlockPage.getLayout = function (page: ReactElement) {
  return <EbankingMainLayout>{page}</EbankingMainLayout>;
};

export default COOPChequeBlockPage;
