import React from 'react';
import { IoIosInformationCircle } from 'react-icons/io';
import { IoCheckmarkCircleSharp, IoWarning, IoWarningOutline } from 'react-icons/io5';
import {
  Alert as ChakraAlert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
} from '@chakra-ui/react';

import { Button } from '@myra-ui/foundations';

export interface CalloutProps {
  status: 'warning' | 'error' | 'info';
  title?: string;
  subtitle?: string;

  bottomButtonlabel?: string;
  bottomButtonHandler?: () => void;
  buttonVariant?: 'link' | 'outline' | 'solid' | 'ghost' | 'unstyled' | undefined;
  children?: React.ReactNode;
}

const ICON_DICT = {
  error: IoWarningOutline,
  success: IoCheckmarkCircleSharp,
  warning: IoWarning,
  info: IoIosInformationCircle,
};

const COLOR_DICT = {
  error: 'danger.500',
  success: 'success.500',
  warning: 'warning.900',
  info: 'info.0',
};

export const Callout = ({
  status,
  title,
  subtitle,

  children,
  bottomButtonlabel,
  bottomButtonHandler,

  buttonVariant,
}: CalloutProps) => (
  <ChakraAlert variant={status}>
    <Box display="flex" justifyContent="space-between" width="100%">
      <Box width="100%" display="flex" flexDirection="column" gap="s8">
        <Box width="100%" display="flex">
          <AlertIcon as={ICON_DICT[status]} />

          <Box width="100%" display="flex" flexDir="column" gap="s8">
            {title && <AlertTitle>{title}</AlertTitle>}
            {(subtitle || children) && <AlertDescription>{children}</AlertDescription>}
            {bottomButtonlabel && (
              <Box display="flex" flexDirection="row" justifyContent="flex-start">
                <Button
                  minW="0"
                  px={0}
                  color={COLOR_DICT[status]}
                  variant={buttonVariant ?? 'link'}
                  shade={status === 'error' ? 'danger' : 'primary'}
                  onClick={bottomButtonHandler}
                >
                  {bottomButtonlabel}
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  </ChakraAlert>
);
