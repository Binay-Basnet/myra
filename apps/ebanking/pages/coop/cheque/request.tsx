import { ReactElement } from 'react';

import { EbankingFeatureChequeRequest } from '@coop/ebanking/coop';
import { EbankingMainLayout } from '@coop/ebanking/ui-layout';

const COOPChequeRequestPage = () => <EbankingFeatureChequeRequest />;

COOPChequeRequestPage.getLayout = function (page: ReactElement) {
  return <EbankingMainLayout>{page}</EbankingMainLayout>;
};

export default COOPChequeRequestPage;
