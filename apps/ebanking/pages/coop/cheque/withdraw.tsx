import { ReactElement } from 'react';

import { EbankingMainLayout } from '@coop/ebanking/ui-layout';

import Temp from '../../temp';

const COOPChequeWithdrawPage = () => {
  return <Temp />;
};

COOPChequeWithdrawPage.getLayout = function (page: ReactElement) {
  return <EbankingMainLayout>{page}</EbankingMainLayout>;
};

export default COOPChequeWithdrawPage;
