import React from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import {
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  ModalProps as ChakraModalProps,
} from '@chakra-ui/react';

import { Button } from '@coop/shared/ui';
import { Icon, IconButton, TextFields } from '@coop/shared/ui';

/* eslint-disable-next-line */
export interface ModalChakraProps
  extends Omit<ChakraModalProps, 'isOpen' | 'onClose'> {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: React.ReactNode;
  primaryButtonLabel?: string;
  secondaryButtonLabel?: string;
  primaryButtonHandler?: () => null;
  secondaryButtonHandler?: () => null;
  linkButtonLabel?: string;
  linkButtonHandler?: () => null;
  isDanger?: boolean;
}

export function ChakraModal(props: ModalChakraProps) {
  const {
    open,
    onClose,
    children,
    title,
    primaryButtonLabel,
    secondaryButtonLabel,
    primaryButtonHandler,
    secondaryButtonHandler,
    linkButtonLabel,
    linkButtonHandler,
    isDanger,
    ...rest
  } = props;

  return (
    <Modal {...rest} isOpen={open} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        {title && (
          <Box
            p="s16"
            borderBottom={'1px solid'}
            borderColor="border.layout"
            minH="50px"
            display={'flex'}
            alignItems="center"
          >
            <TextFields variant="pageHeader">{title}</TextFields>
          </Box>
        )}
        <ModalCloseButton _focus={{}} p={0}>
          <IconButton
            variant={'ghost'}
            aria-label="close"
            icon={<Icon as={IoCloseOutline} size="lg" color={'gray.500'} />}
          />
        </ModalCloseButton>
        <ModalBody
          p="s16"
          borderBottom={
            primaryButtonLabel || secondaryButtonLabel || linkButtonLabel
              ? '1px solid'
              : 'none'
          }
          borderColor="border.layout"
        >
          {children}
        </ModalBody>{' '}
        {(primaryButtonLabel || secondaryButtonLabel || linkButtonLabel) && (
          <ModalFooter p="s16" display={'flex'} justifyContent="space-between">
            <Box>
              {linkButtonLabel && (
                <Button variant="link" onClick={linkButtonHandler}>
                  {linkButtonLabel}
                </Button>
              )}
            </Box>
            <Box
              display={'flex'}
              flexDirection="row"
              gap="s8"
              justifyContent={'flex-end'}
            >
              {secondaryButtonLabel && (
                <Button
                  width={'100px'}
                  variant="outline"
                  shade="neutral"
                  onClick={secondaryButtonHandler}
                >
                  {secondaryButtonLabel}
                </Button>
              )}
              {primaryButtonLabel && (
                <Button
                  variant="solid"
                  onClick={primaryButtonHandler}
                  width={'100px'}
                  shade={isDanger ? 'danger' : 'primary'}
                >
                  {primaryButtonLabel}
                </Button>
              )}
            </Box>
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  );
}

export default ChakraModal;
