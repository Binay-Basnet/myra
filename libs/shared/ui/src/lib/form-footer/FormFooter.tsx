import React from 'react';

import { Box } from '@coop/shared/ui';

/* eslint-disable-next-line */
export interface FormFooterProps {
  status: React.ReactNode;
  draftButton: React.ReactNode;
  mainButton: React.ReactNode;
}

export function FormFooter({
  status,
  draftButton,
  mainButton,
}: FormFooterProps) {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      background="white"
      padding="16px 20px"
      borderTop="3px solid"
      borderColor="border.layout"
    >
      {status}
      <Box display="flex" gap="s16">
        {draftButton}

        {mainButton}
      </Box>
    </Box>
  );
}

export default FormFooter;
