import { ReactElement } from 'react';

import { EbankingAccountsPage } from '@coop/ebanking/accounts';
import { EbankingAccountLayout } from '@coop/ebanking/ui-layout';

const AccountsListPage = () => {
  return <EbankingAccountsPage />;
};

export default AccountsListPage;

AccountsListPage.getLayout = function (page: ReactElement) {
  return <EbankingAccountLayout>{page}</EbankingAccountLayout>;
};
