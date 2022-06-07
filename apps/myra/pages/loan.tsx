import React, { ReactElement } from 'react';
import { MainLayout } from '@coop/myra/ui';

const Loan = () => {
  return <div style={{ marginTop: '150px' }}>Loan share share</div>;
};

Loan.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
export default Loan;
