import { ReactElement } from 'react';

import { EbankingAccountLayout } from '@coop/ebanking/ui-layout';

import Home from '../home';

const AccountsListPage = () => {
  return <Home />;
};

export default AccountsListPage;

AccountsListPage.getLayout = function (page: ReactElement) {
  return <EbankingAccountLayout>{page}</EbankingAccountLayout>;
};
