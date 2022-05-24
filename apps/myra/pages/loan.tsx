import React from 'react';
import { MainLayout } from '@saccos/myra/ui';
import { ReactElement } from 'react';

const Loan = () => {
  return <div style={{ marginTop: '150px' }}>Loan share share</div>;
};

Loan.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
export default Loan;
