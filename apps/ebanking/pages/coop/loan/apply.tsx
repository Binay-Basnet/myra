import { ReactElement } from 'react';

import { ApplyForLoan } from '@coop/ebanking/coop';
import { EbankingMainLayout } from '@coop/ebanking/ui-layout';

const COOPLoanApplyPage = () => <ApplyForLoan />;

COOPLoanApplyPage.getLayout = (page: ReactElement) => (
  <EbankingMainLayout>{page}</EbankingMainLayout>
);

export default COOPLoanApplyPage;
