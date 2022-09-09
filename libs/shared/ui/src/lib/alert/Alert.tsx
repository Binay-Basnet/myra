import React, { useState } from 'react';
import { IoIosInformationCircle } from 'react-icons/io';
import { IoCheckmarkCircleSharp, IoClose, IoWarning } from 'react-icons/io5';
import { MdError } from 'react-icons/md';
import {
  Alert as ChakraAlert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Collapse,
} from '@chakra-ui/react';

import Button from '../button/Button';
import Icon from '../icon/Icon';
import IconButton from '../icon-button/IconButton';
import Text from '../text/Text';

export interface AlertProps {
  status: 'error' | 'warning' | 'success' | 'info';
  title?: string;
  subtitle?: string;
  hideCloseIcon?: boolean;
  showUndo?: boolean;
  undoText?: string;
  undoHandler?: () => void;
  showAlert?: boolean;
  bottomButtonlabel?: string;
  bottomButtonHandler?: () => void;
  children?: React.ReactNode;
}

const ICON_DICT = {
  error: MdError,
  success: IoCheckmarkCircleSharp,
  warning: IoWarning,
  info: IoIosInformationCircle,
};

const COLOR_DICT = {
  error: 'danger.500',
  success: 'success.500',
  warning: 'warning.900',
  info: 'info.900',
};

export function Alert({
  status,
  title,
  subtitle,
  showAlert = true,
  showUndo,
  undoHandler,
  undoText,
  children,
  bottomButtonlabel,
  bottomButtonHandler,
  hideCloseIcon,
}: AlertProps) {
  const [isAlertShown, setIsAlertShown] = useState(showAlert);

  return (
    <Collapse in={isAlertShown}>
      <ChakraAlert variant={status}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          width="100%"
        >
          <Box display={'flex'} flexDirection="column" gap="s8">
            <Box display="flex">
              <AlertIcon as={ICON_DICT[status]} />

              <Box display="flex" flexDir="column" gap="s8">
                {title && <AlertTitle>{title}</AlertTitle>}
                {(subtitle || children) && (
                  <AlertDescription>
                    {subtitle}
                    {children}
                  </AlertDescription>
                )}
              </Box>
            </Box>
            {bottomButtonlabel && (
              <Box
                display={'flex'}
                flexDirection="row"
                justifyContent={'flex-start'}
              >
                <Button
                  variant="link"
                  shade={status === 'error' ? 'danger' : 'primary'}
                  onClick={bottomButtonHandler}
                >
                  {bottomButtonlabel}
                </Button>
              </Box>
            )}
          </Box>
          {showUndo ? (
            <Button onClick={undoHandler} variant="ghost" size="xs">
              <Text fontSize="s3" fontWeight="600" color={COLOR_DICT[status]}>
                {undoText ?? 'Undo'}
              </Text>
            </Button>
          ) : hideCloseIcon ? null : (
            <IconButton
              aria-label="close"
              icon={<Icon as={IoClose} color={COLOR_DICT[status]} />}
              variant="ghost"
              size="xs"
              onClick={() => setIsAlertShown(false)}
            />
          )}
        </Box>
      </ChakraAlert>
    </Collapse>
  );
}

export default Alert;
