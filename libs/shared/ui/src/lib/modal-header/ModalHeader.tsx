import React from 'react';
import { IoClose } from 'react-icons/io5';
import { Box, IconButton } from '@chakra-ui/react';

import Icon from '../icon/Icon';
import TextFields from '../text-fields/TextFields';

export interface ModalHeaderProps {
  heading: string;
  onClose: () => void;
}

export const ModalHeader = ({ heading, onClose }: ModalHeaderProps) => {
  return (
    <Box
      h="50px"
      bg="white"
      zIndex="10"
      w="100%"
      borderBottom="1px solid #E6E6E6"
      px="s16"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <TextFields variant="pageHeader" color="gray.800">
        {heading}
      </TextFields>
      <IconButton
        variant={'ghost'}
        aria-label="close"
        color="gray.500"
        icon={<Icon as={IoClose} size="lg" />}
        onClick={onClose}
      />
    </Box>
  );
};

export default ModalHeader;
