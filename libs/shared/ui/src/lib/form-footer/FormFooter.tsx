import React from 'react';

import { Box, Button, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

/* eslint-disable-next-line */
export interface FormFooterProps {
  status?: React.ReactNode;
  statusHandler?: () => void;
  draftButton?: React.ReactNode;
  mainButtonLabel?: string;
  isMainButtonDisabled?: boolean;
  dangerButton?: boolean;
  mainButtonHandler?: () => void;
}

export const FormFooter = ({
  status,
  draftButton,
  dangerButton,
  mainButtonLabel,
  mainButtonHandler,
  isMainButtonDisabled,
  statusHandler,
}: FormFooterProps) => {
  const { t } = useTranslation();
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      background="white"
      px="s20"
      py="s20"
      h="60px"
      borderTop="1px solid"
      borderColor="border.layout"
    >
      <Text fontStyle="italic" as="div" onClick={statusHandler}>
        {status}
      </Text>
      <Box display="flex" gap="s16">
        {draftButton}

        <Button
          width="160px"
          isDisabled={isMainButtonDisabled}
          onClick={mainButtonHandler}
          shade={dangerButton ? 'danger' : 'primary'}
        >
          {mainButtonLabel ?? t['next']}
        </Button>
      </Box>
    </Box>
  );
};

export default FormFooter;
