import React from 'react';
import { Button } from '@chakra-ui/react';

import { useTranslation } from '@coop/shared/utils';

import Box from '../box/Box';

/* eslint-disable-next-line */
export interface SettingsFooterProps {
  handleDiscard?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  handleSave?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

export const SettingsFooter = (props: SettingsFooterProps) => {
  const { t } = useTranslation();
  const { handleDiscard, handleSave } = props;
  return (
    <Box
      p="s16"
      display="flex"
      position="fixed"
      bottom={0}
      borderTop="1px solid"
      borderColor="gray.100"
      w="calc(100vw - 570px)"
      justifyContent="flex-end"
      bg="white"
      gap={2}
      zIndex="12"
    >
      <Button variant="ghost" onClick={handleDiscard}>
        {t['discardChanges']}
      </Button>
      <Button onClick={handleSave}>{t['saveChanges']} </Button>
    </Box>
  );
};

export default SettingsFooter;
