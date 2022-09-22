import { useEffect } from 'react';
import { IoCheckmarkCircleOutline } from 'react-icons/io5';
import { RiAlertLine } from 'react-icons/ri';
import { Modal, ModalContent, ModalOverlay, useDisclosure } from '@chakra-ui/react';

import { Box, Button, Icon, TextFields } from '@coop/shared/ui';

interface TransferModalProps {
  status: 'success' | 'failure';
}

export const TransferModal = ({ status }: TransferModalProps) => {
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
        bg={status === 'success' ? 'success.500' : 'danger.500'}
        color="white"
      >
        <Box display="flex" alignItems="center" flexDir="column" gap="s12">
          <Icon
            as={status === 'success' ? IoCheckmarkCircleOutline : RiAlertLine}
            size="xl"
            stroke="white"
          />
          <TextFields variant="pageHeader">
            {status === 'success' ? 'Transfer Successful' : 'Transfer Failed'}{' '}
          </TextFields>
        </Box>
        <Button
          w="100px"
          onClick={onClose}
          color={status === 'success' ? 'success.500' : 'danger.500'}
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
