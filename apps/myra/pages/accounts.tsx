import { ReactElement } from 'react';

import { MainLayout } from '@coop/shared/ui';

const Accounts = () => <div style={{ marginTop: '150px' }}>Accounts share share</div>;

Accounts.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
export default Accounts;
