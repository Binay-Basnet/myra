import { ReactElement } from 'react';

import { NewComplaint } from '@coop/ebanking/coop';
import { EbankingMainLayout } from '@coop/ebanking/ui-layout';

const COOPNewComplaintPage = () => <NewComplaint />;

COOPNewComplaintPage.getLayout = function (page: ReactElement) {
  return <EbankingMainLayout>{page}</EbankingMainLayout>;
};

export default COOPNewComplaintPage;
