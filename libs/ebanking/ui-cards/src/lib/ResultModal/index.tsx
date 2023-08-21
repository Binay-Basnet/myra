import { useEffect } from 'react';
import { IoCheckmarkCircleOutline } from 'react-icons/io5';
import { RiAlertLine } from 'react-icons/ri';
import { Modal, ModalContent, ModalOverlay, useDisclosure } from '@chakra-ui/react';

import { Box, Button, Icon, Text } from '@myra-ui';

interface ResultModalProps {
  status: 'success' | 'failure' | 'pending';

  title: string;
  description?: string;
}

const getStatusData = (status: 'success' | 'failure' | 'pending') => {
  switch (status) {
    case 'success':
      return { color: 'success.500', icon: IoCheckmarkCircleOutline };

    case 'failure':
      return { color: 'danger.500', icon: RiAlertLine };

    case 'pending':
      return { color: 'yellow.500', icon: IoCheckmarkCircleOutline };

    default:
      return { color: 'success.500', icon: IoCheckmarkCircleOutline };
  }
};

export const ResultModal = ({ status, title, description }: ResultModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    onOpen();
  }, [onOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />

      <ModalContent
        w="375px"
        h="252px"
        borderRadius="br3"
        p="s16"
        boxShadow="E2"
        display="flex"
        flexDir="column"
        alignItems="center"
        justifyContent="center"
        gap="s24"
        bg={getStatusData(status)?.color}
        color="white"
      >
        <Box display="flex" alignItems="center" flexDir="column" gap="s12">
          <Icon as={getStatusData(status)?.icon} size="xl" stroke="white" />
          <Text variant="pageHeader">{title}</Text>

          {description && (
            <Text variant="formHelper" textAlign="center">
              {description}
            </Text>
          )}
        </Box>
        <Button
          w="100px"
          onClick={onClose}
          color={getStatusData(status)?.color}
          borderBottom="1px"
          borderColor="gray.40"
          background="white"
          _hover={{ bg: 'primary.100' }}
          _active={{ bg: 'primary.200' }}
        >
          Done
        </Button>
      </ModalContent>
    </Modal>
  );
};
