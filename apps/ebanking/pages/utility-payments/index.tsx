import { ReactElement } from 'react';

import { EbankingAccountLayout } from '@coop/ebanking/ui-layout';
import { EbankingFeatureUtilityPayment } from '@coop/ebanking/utility-payment';

const UtilityPayments = () => <EbankingFeatureUtilityPayment />;

UtilityPayments.getLayout = (page: ReactElement) => (
  <EbankingAccountLayout>{page}</EbankingAccountLayout>
);

export default UtilityPayments;
