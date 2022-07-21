import { ReactElement } from 'react';

import { EbankingAccountDetailPage } from '@coop/ebanking/accounts';
import { EbankingAccountLayout } from '@coop/ebanking/ui-layout';

const AccountDetailPage = () => <EbankingAccountDetailPage />;

export default AccountDetailPage;

AccountDetailPage.getLayout = function (page: ReactElement) {
  return <EbankingAccountLayout>{page}</EbankingAccountLayout>;
};
