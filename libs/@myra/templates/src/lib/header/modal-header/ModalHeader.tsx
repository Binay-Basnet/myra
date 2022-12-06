import { IoClose } from 'react-icons/io5';
import { Box, IconButton } from '@chakra-ui/react';

import { Icon, Text } from '@myra-ui/foundations';

export interface ModalHeaderProps {
  heading: string;
  onClose: () => void;
}

export const ModalHeader = ({ heading, onClose }: ModalHeaderProps) => (
  <Box
    h="50px"
    bg="white"
    zIndex="10"
    w="100%"
    borderBottom="1px solid"
    borderColor="border.layout"
    px="s16"
    display="flex"
    justifyContent="space-between"
    alignItems="center"
  >
    <Text variant="pageHeader" color="gray.800">
      {heading}
    </Text>
    <IconButton
      variant="ghost"
      aria-label="close"
      color="gray.500"
      icon={<Icon as={IoClose} size="lg" />}
      onClick={onClose}
    />
  </Box>
);

export default ModalHeader;
