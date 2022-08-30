import { FormProvider, useForm } from 'react-hook-form';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';

import { FormSelect } from '@coop/shared/form';
import { Box, Button, Divider, Text } from '@coop/shared/ui';

interface IAddMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddMemberModal = ({ isOpen, onClose }: IAddMemberModalProps) => {
  const methods = useForm();
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
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
          <FormProvider {...methods}>
            <Box display="flex" flexDirection="column" gap="s20">
              <FormSelect name="memberId" label="Member" />

              <FormSelect name="accountId" label="Account" />
            </Box>
          </FormProvider>
        </ModalBody>

        <Divider />
        <ModalFooter>
          <Button variant="solid" onClick={onClose}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
