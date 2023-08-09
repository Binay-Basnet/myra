import { ReactElement } from 'react';

import { EbankingAccountLayout } from '@coop/ebanking/ui-layout';
import { UtilityMobileTopup } from '@coop/ebanking/utility-payment';

const MobileTopupPage = () => <UtilityMobileTopup />;

MobileTopupPage.getLayout = function getLayout(page: ReactElement) {
  return <EbankingAccountLayout>{page}</EbankingAccountLayout>;
};

export default MobileTopupPage;
