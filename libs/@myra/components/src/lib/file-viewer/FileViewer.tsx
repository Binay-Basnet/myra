import { AiOutlineEye } from 'react-icons/ai';
import { RiFile3Fill } from 'react-icons/ri';
import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';

import { Box, Icon, Text } from '@myra-ui/foundations';

/* eslint-disable-next-line */
export interface FileViewerProps {
  fileName?: string;
  fileUrl?: string;
  type?: string;
  // fileSize?: string;
}

export const FileViewer = ({ fileName, fileUrl, type }: FileViewerProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      display="flex"
      p="s12"
      borderRadius="br2"
      border="1px"
      borderColor="border.layout"
      justifyContent="space-between"
      w="auto"
      h="64px"
      alignItems="center"
      gap="s8"
    >
      <Box display="flex" px="s16" py="s8" gap="s20" alignItems="center" flex={1}>
        <Icon as={RiFile3Fill} size="lg" color="primary.500" />
        <Box display="flex" flexDirection="column" gap="s4" maxW="250px">
          <Text fontSize="r1" fontWeight="500" noOfLines={1}>
            {fileName}
          </Text>
          {type && <Text fontSize="r1" fontWeight="500">{`${type}`}</Text>}
        </Box>
      </Box>
      <Icon
        as={AiOutlineEye}
        size="lg"
        color="primary.500"
        onClick={() => onOpen()}
        cursor="pointer"
      />

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />

        <ModalContent display="flex" alignItems="center" justifyContent="center" minHeight="300px">
          <ModalCloseButton _focus={{ boxShadow: 'none' }} />
          <img src={fileUrl} alt="fileUrl" />
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default FileViewer;
