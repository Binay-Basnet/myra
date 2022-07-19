import { ReactElement } from 'react';

import { EbankingAccountLayout } from '@coop/ebanking/ui-layout';

import Temp from '../temp';

const ScheduledPaymentsListPage = () => {
  return <Temp />;
};

ScheduledPaymentsListPage.getLayout = function (page: ReactElement) {
  return <EbankingAccountLayout>{page}</EbankingAccountLayout>;
};

export default ScheduledPaymentsListPage;
