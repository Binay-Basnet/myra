import { ReactElement } from 'react';
import { MigrationUiComponents } from '@migration/ui-components';
import { MigrationUiLayout } from '@migration/ui-layout';

import { Box } from '@myra-ui';

export const Index = () => (
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.css file.
   */
  <Box>
    <MigrationUiComponents />
  </Box>
);

Index.getLayout = function getLayout(page: ReactElement) {
  return <MigrationUiLayout>{page}</MigrationUiLayout>;
};

export default Index;
