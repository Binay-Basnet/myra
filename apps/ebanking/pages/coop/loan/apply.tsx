import { ReactElement } from 'react';

import { EbankingMainLayout } from '@coop/ebanking/ui-layout';

import Temp from '../../temp';

const COOPLoanApplyPage = () => <Temp />;

COOPLoanApplyPage.getLayout = function (page: ReactElement) {
  return <EbankingMainLayout>{page}</EbankingMainLayout>;
};

export default COOPLoanApplyPage;
