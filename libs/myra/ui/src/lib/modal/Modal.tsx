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
import { Button, Divider } from '@saccos/myra/ui';

/* eslint-disable-next-line */
export interface ModalProps extends ChakraModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  modalButtonProp: string;
  children: React.ReactNode;
  titleProps?: React.ReactNode;
  footerPrimary1Props?: React.ReactNode;
  footerPrimary2Props?: React.ReactNode;
  footerSecondaryProps?: React.ReactNode;
  onClickPrimary?: () => void;
}

export function Modal(props: ModalProps) {
  const {
    modalButtonProp,
    children,
    titleProps,
    footerPrimary1Props,
    footerPrimary2Props,
    footerSecondaryProps,
    onClickPrimary,
    ...rest
  } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen}>{modalButtonProp}</Button>
      <ChakraModal isOpen={isOpen} onClose={onClose} {...rest}>
        <ModalOverlay />
        <ModalContent>
          {titleProps && (
            <>
              <ModalHeader>{titleProps}</ModalHeader>
              <Divider />
            </>
          )}

          <ModalCloseButton />
          <ModalBody>{children}</ModalBody>
          <Divider />
          <ModalFooter>
            {footerSecondaryProps && (
              <Button variant="outline" mr={2} onClick={onClose}>
                {footerSecondaryProps}
              </Button>
            )}

            {footerPrimary1Props && (
              <Button colorScheme="primary" onClick={onClickPrimary}>
                {footerPrimary1Props}
              </Button>
            )}
            {footerPrimary2Props && (
              <Button colorScheme="danger" onClick={onClickPrimary}>
                {footerPrimary2Props}
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </ChakraModal>
    </>
  );
}

export default Modal;
