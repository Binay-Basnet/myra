import React, { ReactElement } from 'react';

import { AccountTransferPage } from '@coop/ebanking/funds';
import { EbankingAccountLayout } from '@coop/ebanking/ui-layout';

const AccountTransfer = () => {
  return <AccountTransferPage />;
};

AccountTransfer.getLayout = function (page: ReactElement) {
  return <EbankingAccountLayout>{page}</EbankingAccountLayout>;
};

export default AccountTransfer;
