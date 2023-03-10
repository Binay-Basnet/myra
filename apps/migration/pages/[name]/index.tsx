import { ReactElement } from 'react';
import { MigrationDetailsComponents } from '@migration/ui-components';
import { MigrationUiLayout } from '@migration/ui-layout';

import { Box } from '@myra-ui';

export const ProjectDetails = () => (
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.css file.
   */
  <Box>
    <MigrationDetailsComponents />
  </Box>
);

ProjectDetails.getLayout = function getLayout(page: ReactElement) {
  return <MigrationUiLayout>{page}</MigrationUiLayout>;
};

export default ProjectDetails;
