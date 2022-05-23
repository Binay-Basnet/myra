import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  ModalProps as ChakraModalProps,
  useDisclosure,
} from '@chakra-ui/react';
import { Button } from '@saccos/myra/ui';

/* eslint-disable-next-line */
export interface ModalProps extends ChakraModalProps {
  children?: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  onClick: () => void;
}

export function Modal(props: ModalProps) {
  const { children, ...rest } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>
      <ChakraModal isOpen={isOpen} onClose={onClose} {...rest}>
        <ModalOverlay />
        {children}
      </ChakraModal>
    </>
  );
}

export default Modal;
