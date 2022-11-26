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
import { Button, Icon, IconButton, TextFields } from '@myra/dump';

import { useTranslation } from '@coop/shared/utils';

/* eslint-disable-next-line */
export interface ModalChakraProps extends Omit<ChakraModalProps, 'isOpen' | 'onClose'> {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  primaryButtonLabel?: string;
  secondaryButtonLabel?: string;
  secondaryButtonVariant?: 'ghost' | 'outline' | 'solid';
  primaryButtonHandler?: () => void;
  secondaryButtonHandler?: () => void;
  linkButtonLabel?: string;
  linkButtonHandler?: () => void;
  isSecondaryDanger?: boolean;
  isDanger?: boolean;
  isDisabled?: boolean;
  width?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | string;
  hasCloseBtn?: boolean;
  hidePadding?: boolean;
}

export const ChakraModal = (props: ModalChakraProps) => {
  const {
    open,
    secondaryButtonVariant = 'ghost',
    onClose,
    children,
    title,
    primaryButtonLabel,
    secondaryButtonLabel,
    primaryButtonHandler,
    secondaryButtonHandler,
    linkButtonLabel,
    linkButtonHandler,
    isSecondaryDanger,
    isDisabled,
    isDanger,
    width = 'xl',
    hasCloseBtn = true,
    hidePadding = false,
    ...rest
  } = props;

  const { t } = useTranslation();

  return (
    <Modal
      {...rest}
      isOpen={open}
      onClose={onClose}
      isCentered
      preserveScrollBarGap
      blockScrollOnMount
    >
      <ModalOverlay />
      <ModalContent maxW={width}>
        {title && (
          <Box
            p="s16"
            borderBottom="1px solid"
            borderColor="border.layout"
            minH="50px"
            display="flex"
            alignItems="center"
          >
            <TextFields variant="pageHeader">{t[title] ?? title}</TextFields>
          </Box>
        )}
        {hasCloseBtn && (
          <ModalCloseButton _focus={{}} p={0}>
            <IconButton
              variant="ghost"
              aria-label="close"
              icon={<Icon as={IoCloseOutline} size="lg" color="gray.500" />}
            />
          </ModalCloseButton>
        )}
        <ModalBody
          p={hidePadding ? 0 : 's16'}
          borderBottom={
            primaryButtonLabel || secondaryButtonLabel || linkButtonLabel ? '1px solid' : 'none'
          }
          borderColor="border.layout"
        >
          {children}
        </ModalBody>{' '}
        {(primaryButtonLabel || secondaryButtonLabel || linkButtonLabel) && (
          <ModalFooter p="s16" display="flex" justifyContent="space-between">
            <Box>
              {linkButtonLabel && (
                <Button variant="link" onClick={linkButtonHandler}>
                  {t[linkButtonLabel] ?? linkButtonLabel}
                </Button>
              )}
            </Box>
            <Box display="flex" flexDirection="row" gap="s8" justifyContent="flex-end">
              {secondaryButtonLabel && (
                <Button
                  maxW="200px"
                  variant={secondaryButtonVariant}
                  shade={isSecondaryDanger ? 'danger' : 'neutral'}
                  onClick={secondaryButtonHandler}
                >
                  {t[secondaryButtonLabel] ?? secondaryButtonLabel}
                </Button>
              )}
              {primaryButtonLabel && (
                <Button
                  variant="solid"
                  onClick={primaryButtonHandler}
                  maxW="200px"
                  isDisabled={isDisabled}
                  shade={isDanger ? 'danger' : 'primary'}
                >
                  {t[primaryButtonLabel] ?? primaryButtonLabel}
                </Button>
              )}
            </Box>
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ChakraModal;
