import React from 'react';
import { MainLayout } from '@saccos/myra/ui';
import { ReactElement } from 'react';

const Share = () => {
  return <div style={{ marginTop: '150px' }}>Share share share</div>;
};

Share.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
export default Share;
