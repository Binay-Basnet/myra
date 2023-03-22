import { ReactElement } from 'react';

import { Box } from '@myra-ui';

import { MainLayout } from '@coop/neosys-admin/layout';

const Index = () => <Box>Dashboard</Box>;

Index.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};

export default Index;
