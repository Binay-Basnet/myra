import { ReactElement } from 'react';

import { EbankingFeaureWithdrawCollectorRequest } from '@coop/ebanking/coop';
import { EbankingMainLayout } from '@coop/ebanking/ui-layout';

const COOPChequeWithdrawPage = () => <EbankingFeaureWithdrawCollectorRequest />;

COOPChequeWithdrawPage.getLayout = function (page: ReactElement) {
  return <EbankingMainLayout>{page}</EbankingMainLayout>;
};

export default COOPChequeWithdrawPage;
