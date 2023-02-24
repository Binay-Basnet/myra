import { ReactElement } from 'react';

import { Box } from '@myra-ui';

import { MainLayout } from '@coop/neosys-admin/layout';

const Index = () => <Box>Dashboard</Box>;

Index.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default Index;
