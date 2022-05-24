import React from 'react';
import { MainLayout } from '@saccos/myra/ui';
import { ReactElement } from 'react';

const Accounts = () => {
  return <div style={{ marginTop: '150px' }}>Accounts share share</div>;
};

Accounts.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
export default Accounts;
