import React from 'react';
import { useFormContext } from 'react-hook-form';

import { Box, Button, Text } from '@myra-ui/foundations';

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
  mainButton?: React.ReactNode;
}

export const FormFooter = ({
  status,
  draftButton,
  dangerButton,
  mainButtonLabel,
  mainButtonHandler,
  isMainButtonDisabled,
  statusHandler,
  mainButton,
}: FormFooterProps) => {
  const { t } = useTranslation();
  const { reset } = useFormContext() || {
    reset: () => {},
  };
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      background="white"
      px="s20"
      py="s20"
      h="3.75rem"
      borderTop="1px solid"
      borderColor="border.layout"
    >
      <Text as="div" onClick={statusHandler}>
        {status}
      </Text>
      <Box display="flex" gap="s16">
        {draftButton}

        {mainButton || (
          <Button
            minWidth="160px"
            isDisabled={isMainButtonDisabled}
            onClick={() => {
              reset({}, { keepValues: true });
              mainButtonHandler?.();
            }}
            shade={dangerButton ? 'danger' : 'primary'}
          >
            {`${mainButtonLabel}` ?? t['next']}
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default FormFooter;
