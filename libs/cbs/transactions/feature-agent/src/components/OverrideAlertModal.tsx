import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';

import { Button, Divider, Text } from '@coop/shared/ui';

interface IOverrideAlertModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export const OverrideAlertModal = ({
  isOpen,
  onCancel,
  onConfirm,
}: IOverrideAlertModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onCancel} isCentered={true}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text
            fontSize="r2"
            color="neutralColorLight.Gray-80"
            fontWeight="SemiBold"
          >
            Add Member
          </Text>
        </ModalHeader>
        <Divider />

        <ModalCloseButton />
        <ModalBody p="s16" maxHeight="60vh" overflowY="scroll">
          <Text fontSize="r1" fontWeight={400} color="gray.600">
            This member has already been assigned to an agent. Do you want to
            override the agent?
          </Text>
        </ModalBody>

        <Divider />
        <ModalFooter gap="s8">
          <Button variant="outline" shade="neutral" onClick={onCancel}>
            Cancel
          </Button>

          <Button variant="solid" shade="danger" onClick={onConfirm}>
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
