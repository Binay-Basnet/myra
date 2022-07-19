import { ReactElement } from 'react';

import { EbankingAccountLayout } from '@coop/ebanking/ui-layout';

import Temp from '../temp';

const SavedPaymentsAddEditPage = () => {
  return <Temp />;
};

SavedPaymentsAddEditPage.getLayout = function (page: ReactElement) {
  return <EbankingAccountLayout>{page}</EbankingAccountLayout>;
};

export default SavedPaymentsAddEditPage;
