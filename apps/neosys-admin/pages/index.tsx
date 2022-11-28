import { ReactElement } from 'react';

import { MainLayout } from '@coop/neosys-admin/layout';
import { Box } from '@myra-ui';

const Index = () => <Box>Dashboard</Box>;

Index.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default Index;
