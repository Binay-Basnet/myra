import React from 'react';
import { AddIcon } from '@chakra-ui/icons';

import { AccordionPanel, Box, Button, Checkbox } from '@coop/shared/ui';

interface IKYMBottomPanelProps {
  setItems?: () => void;
}

export const KYMBottomPanel = ({ setItems }: IKYMBottomPanelProps) => {
  return (
    <AccordionPanel p="0" borderTop={'1px'} borderTopColor={'border.layout'}>
      <Box
        display="flex"
        alignItems={'center'}
        justifyContent="space-between"
        h="60px"
        px="s16"
      >
        <Button
          variant="ghost"
          size={'md'}
          shade="primary"
          leftIcon={<AddIcon />}
          onClick={setItems}
          _hover={{ bg: 'transparent' }}
        >
          Add New Option
        </Button>
        <Checkbox children="Show “Other” option" />
      </Box>
    </AccordionPanel>
  );
};
