import React, { ReactElement } from 'react';

import { SendMoneyPage } from '@coop/ebanking/funds';
import { EbankingAccountLayout } from '@coop/ebanking/ui-layout';

const SendMoney = () => <SendMoneyPage />;

SendMoney.getLayout = function (page: ReactElement) {
  return <EbankingAccountLayout>{page}</EbankingAccountLayout>;
};

export default SendMoney;
