import { ReactElement } from 'react';
import { TransformedDetailsComponents } from '@migration/ui-components';
import { MigrationUiLayout } from '@migration/ui-layout';

import { Box } from '@myra-ui';

export const DetailsPage = () => (
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.css file.
   */
  <Box>
    <TransformedDetailsComponents />
  </Box>
);

DetailsPage.getLayout = function getLayout(page: ReactElement) {
  return <MigrationUiLayout>{page}</MigrationUiLayout>;
};

export default DetailsPage;
