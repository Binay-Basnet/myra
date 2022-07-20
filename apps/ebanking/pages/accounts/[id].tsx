import { ReactElement } from 'react';

import { EbankingAccountLayout } from '@coop/ebanking/ui-layout';
import { PathBar } from '@coop/shared/ui';

const AccountDetailPage = () => {
  return (
    <>
      <PathBar
        paths={[
          { label: 'Home', link: '/home' },
          { label: 'Saving Account', link: '/accounts' },
        ]}
      />
    </>
  );
};

export default AccountDetailPage;

AccountDetailPage.getLayout = function (page: ReactElement) {
  return <EbankingAccountLayout>{page}</EbankingAccountLayout>;
};
