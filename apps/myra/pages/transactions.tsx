import React, { ReactElement } from 'react';
import { MainLayout } from '@saccos/myra/ui';

const Transactions = () => {
  return <div style={{ marginTop: '150px' }}>Transactions share share</div>;
};

Transactions.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
export default Transactions;
