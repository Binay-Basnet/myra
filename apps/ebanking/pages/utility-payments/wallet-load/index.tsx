import { ReactElement } from 'react';

import { EbankingAccountLayout } from '@coop/ebanking/ui-layout';
import { UtilityWalletLoad } from '@coop/ebanking/utility-payment';

const WalletLoadPaymentPage = () => <UtilityWalletLoad />;

WalletLoadPaymentPage.getLayout = function getLayout(page: ReactElement) {
  return <EbankingAccountLayout>{page}</EbankingAccountLayout>;
};

export default WalletLoadPaymentPage;
