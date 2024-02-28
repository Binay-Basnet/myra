import { ReactElement, useEffect } from 'react';
import { useRouter } from 'next/router';

import { Box, Scrollable } from '@myra-ui';

import { MainLayout } from '@coop/neosys-admin/layout';

const Index = () => {
  const router = useRouter();
  useEffect(() => {
    router.push('/clients');
  }, []);

  return <Box>Dashboard for you jsdagojdsaiogjsadlfjdslfj</Box>;
};

Index.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};

export default Index;
