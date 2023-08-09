import { ReactElement } from 'react';

import { EbankingAccountLayout } from '@coop/ebanking/ui-layout';
import { UtilityInternetPayment } from '@coop/ebanking/utility-payment';

const MobileTopupPage = () => <UtilityInternetPayment />;

MobileTopupPage.getLayout = function getLayout(page: ReactElement) {
  return <EbankingAccountLayout>{page}</EbankingAccountLayout>;
};

export default MobileTopupPage;
