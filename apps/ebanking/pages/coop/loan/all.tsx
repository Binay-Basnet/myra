import { ReactElement } from 'react';

import { LoanApplicationsAll } from '@coop/ebanking/coop';
import { EbankingMainLayout } from '@coop/ebanking/ui-layout';

const COOPLoanHistoryPage = () => <LoanApplicationsAll />;

COOPLoanHistoryPage.getLayout = (page: ReactElement) => (
  <EbankingMainLayout>{page}</EbankingMainLayout>
);

export default COOPLoanHistoryPage;
