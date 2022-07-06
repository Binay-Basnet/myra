import { ReactElement } from 'react';

// import { MainLayout } from '@coop/neosys-admin/layout';
import { MainLayout } from '@coop/neosys-admin/layout';
import { Box } from '@coop/shared/ui';

function Index() {
  return <Box>Dashboard</Box>;
}

Index.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default Index;
