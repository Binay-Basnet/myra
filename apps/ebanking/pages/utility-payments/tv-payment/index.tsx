import { ReactElement } from 'react';

import { EbankingAccountLayout } from '@coop/ebanking/ui-layout';
import { UtilityTVPayment } from '@coop/ebanking/utility-payment';

const TVPaymentPage = () => <UtilityTVPayment />;

TVPaymentPage.getLayout = function getLayout(page: ReactElement) {
  return <EbankingAccountLayout>{page}</EbankingAccountLayout>;
};

export default TVPaymentPage;
