import React, { ReactElement } from 'react';
import { MainLayout } from '@saccos/myra/ui';

const Reports = () => {
  return <div style={{ marginTop: '150px' }}>Reports share share</div>;
};

Reports.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
export default Reports;
