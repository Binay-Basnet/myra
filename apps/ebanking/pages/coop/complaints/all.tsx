import { ReactElement } from 'react';

import { PastComplaints } from '@coop/ebanking/coop';
import { EbankingMainLayout } from '@coop/ebanking/ui-layout';

const COOPAllComplaintPage = () => <PastComplaints />;

COOPAllComplaintPage.getLayout = (page: ReactElement) => (
  <EbankingMainLayout>{page}</EbankingMainLayout>
);

export default COOPAllComplaintPage;
