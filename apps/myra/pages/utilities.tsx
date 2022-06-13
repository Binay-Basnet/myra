import React, { ReactElement } from 'react';
import { MainLayout } from '@coop/shared/ui';

const Utilities = () => {
  return <div style={{ marginTop: '150px' }}>Utilities share share</div>;
};

Utilities.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
export default Utilities;
