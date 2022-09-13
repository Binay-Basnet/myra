import { ReactElement } from 'react';

import { EbankingMainLayout } from '@coop/ebanking/ui-layout';

import Temp from '../../temp';

const COOPLoanHistoryPage = () => <Temp />;

COOPLoanHistoryPage.getLayout = function (page: ReactElement) {
  return <EbankingMainLayout>{page}</EbankingMainLayout>;
};

export default COOPLoanHistoryPage;
