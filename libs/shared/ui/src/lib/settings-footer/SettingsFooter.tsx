import React from 'react';
import { Button } from '@chakra-ui/react';

import Box from '../box/Box';

/* eslint-disable-next-line */
export interface SettingsFooterProps {
  handleDiscard?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  handleSave?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

export const SettingsFooter = (props: SettingsFooterProps) => {
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
        Discard Changes
      </Button>
      <Button onClick={handleSave}>Save Changes</Button>
    </Box>
  );
};

export default SettingsFooter;
