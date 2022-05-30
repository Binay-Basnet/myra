import { MainLayout } from '@saccos/myra/ui';
import React from 'react';
import { ReactElement } from 'react';

const Reports = () => {
  return <div style={{ marginTop: '150px' }}>Reports share share</div>;
};

Reports.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
export default Reports;
