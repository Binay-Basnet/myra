import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

const Accounts = () => <div style={{ marginTop: '150px' }}>Accounts share share</div>;

Accounts.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};
export default Accounts;
