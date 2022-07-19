import { ReactElement } from 'react';

import { EbankingAccountLayout } from '@coop/ebanking/ui-layout';

import Temp from '../temp';

const UtilityPayments = () => {
  return <Temp />;
};

UtilityPayments.getLayout = function (page: ReactElement) {
  return <EbankingAccountLayout>{page}</EbankingAccountLayout>;
};

export default UtilityPayments;
