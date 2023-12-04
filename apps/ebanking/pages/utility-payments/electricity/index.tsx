import { ReactElement } from 'react';

import { EbankingAccountLayout } from '@coop/ebanking/ui-layout';
import { UtilityElectricityPayment } from '@coop/ebanking/utility-payment';

const UtilityElectricityPage = () => <UtilityElectricityPayment />;

UtilityElectricityPage.getLayout = function getLayout(page: ReactElement) {
  return <EbankingAccountLayout>{page}</EbankingAccountLayout>;
};

export default UtilityElectricityPage;
