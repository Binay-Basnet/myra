import { ReactElement } from 'react';

import { EbankingAccountLayout } from '@coop/ebanking/ui-layout';
import { UtilityPackagePayment } from '@coop/ebanking/utility-payment';

const PackagePaymentPage = () => <UtilityPackagePayment />;

PackagePaymentPage.getLayout = function getLayout(page: ReactElement) {
  return <EbankingAccountLayout>{page}</EbankingAccountLayout>;
};

export default PackagePaymentPage;
