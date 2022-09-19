import { ReactElement } from 'react';

import { AccountTransferPage } from '@coop/ebanking/funds';
import { EbankingAccountLayout } from '@coop/ebanking/ui-layout';

const AccountTransfer = () => <AccountTransferPage />;

AccountTransfer.getLayout = function getLayout(page: ReactElement) {
  return <EbankingAccountLayout>{page}</EbankingAccountLayout>;
};

export default AccountTransfer;
