import React from 'react';

import { Box, Button } from '@coop/shared/ui';

/* eslint-disable-next-line */
export interface FormFooterProps {
  status: React.ReactNode;
  draftButton: React.ReactNode;
  mainButtonLabel?: string;
  mainButtonHandler: () => void;
}

export function FormFooter({
  status,
  draftButton,
  mainButtonLabel,
  mainButtonHandler,
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

        <Button width="160px" onClick={mainButtonHandler}>
          {mainButtonLabel ?? 'Next'}
        </Button>
      </Box>
    </Box>
  );
}

export default FormFooter;
