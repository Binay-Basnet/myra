import { MainLayout } from '@saccos/myra/ui';
import React from 'react';
import { ReactElement } from 'react';

const Utilities = () => {
  return <div style={{ marginTop: '150px' }}>Utilities share share</div>;
};

Utilities.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
export default Utilities;
