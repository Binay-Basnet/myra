import { ReactElement } from 'react';

import { Box, MainLayout, WIPState } from '@coop/shared/ui';

const WithDrawViaCollectorRequest = () => (
  <Box minH="calc(100vh - 110px)" display="flex" alignItems="center" justifyContent="center">
    <WIPState />
  </Box>
);

export default WithDrawViaCollectorRequest;

WithDrawViaCollectorRequest.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
