import React from 'react';

import { Box, Button } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

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
  const { t } = useTranslation();
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      background="white"
      px="s16"
      py="s20"
      borderTop="1px solid"
      borderColor="border.layout"
    >
      {status}
      <Box display="flex" gap="s16">
        {draftButton}

        <Button width="160px" onClick={mainButtonHandler}>
          {mainButtonLabel ?? t['next']}
        </Button>
      </Box>
    </Box>
  );
}

export default FormFooter;
