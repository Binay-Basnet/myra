import React from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import {
  Modal as ChakraModal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps as ChakraModalProps,
} from '@chakra-ui/react';

import { Button, Divider, Icon, IconButton } from '@coop/shared/ui';

/* eslint-disable-next-line */
export interface ModalProps
  extends Omit<ChakraModalProps, 'isOpen' | 'onClose'> {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: React.ReactNode;
  footerPrimary1Props?: React.ReactNode;
  footerPrimary2Props?: React.ReactNode;
  footerSecondaryProps?: React.ReactNode;
  leftIcon?: React.ReactElement;
  onClickPrimary?: () => void;
  modalContentProps?: Record<string, string>;
}

export function Modal(props: ModalProps) {
  const {
    open,
    onClose,
    leftIcon,
    children,
    title,
    footerPrimary1Props,
    footerPrimary2Props,
    footerSecondaryProps,
    onClickPrimary,
    modalContentProps,
    ...rest
  } = props;

  return (
    <ChakraModal {...rest} isOpen={open} onClose={onClose}>
      <ModalOverlay />
      <ModalContent {...modalContentProps}>
        {title && (
          <>
            <ModalHeader>{title}</ModalHeader>
            <Divider />
          </>
        )}

        <ModalCloseButton _focus={{}}>
          <IconButton
            variant={'ghost'}
            aria-label="close"
            icon={<Icon as={IoCloseOutline} size="lg" />}
          />
        </ModalCloseButton>
        {/*<ModalCloseButton  _focus={{ bg: 'none' }} />*/}
        <ModalBody>{children}</ModalBody>
        {/* <Divider /> */}
        {footerPrimary1Props ||
          footerPrimary2Props ||
          (footerSecondaryProps && (
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
          ))}
      </ModalContent>
    </ChakraModal>
  );
}

export default Modal;
