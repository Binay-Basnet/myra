import { ReactElement } from 'react';

import { EbankingAccountLayout } from '@coop/ebanking/ui-layout';

import Temp from '../temp';

const SavedPaymentsPage = () => {
  return <Temp />;
};

SavedPaymentsPage.getLayout = function (page: ReactElement) {
  return <EbankingAccountLayout>{page}</EbankingAccountLayout>;
};

export default SavedPaymentsPage;
