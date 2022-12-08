import { Renderable, Toaster as RHToaster } from 'react-hot-toast';
import { Box, Spinner, Text } from '@chakra-ui/react';

import { Icon } from '@myra-ui/foundations';

import { TOAST_COLORS, TOAST_ICONS } from './utils/constants';

export interface ToastProps {
  message: Renderable;
  type: 'success' | 'error' | 'warning' | 'info';
  state?: 'success' | 'error' | 'loading' | 'blank';

  actionText?: string;
  actionTextHandler?: () => void;
}

export const Toast = ({ message, type, state, actionTextHandler, actionText }: ToastProps) => (
  <Box
    minWidth="360px"
    maxWidth="720px"
    display="flex"
    alignItems="center"
    justifyContent="space-between"
    boxShadow="E2"
    px="s16"
    bg={TOAST_COLORS[type]}
    borderRadius="br2"
    minH="56px"
    py="s16"
  >
    <Box display="flex" alignItems="center" gap="s16">
      {state === 'loading' ? (
        <Spinner />
      ) : state === 'blank' ? null : (
        <Icon as={state ? TOAST_ICONS[state] : TOAST_ICONS[type]} size="lg" color="white" />
      )}
      <Text fontSize="r2" color="white" fontWeight="400" noOfLines={3}>
        {message}
      </Text>
    </Box>

    {actionText && (
      <Text
        fontSize="r1"
        fontWeight="500"
        color="white"
        cursor="pointer"
        onClick={actionTextHandler}
      >
        {actionText}
      </Text>
    )}
  </Box>
);

export const Toaster = () => (
  <RHToaster
    gutter={24}
    position="bottom-center"
    containerStyle={{
      inset: '48px',
    }}
    toastOptions={{
      duration: 2000,
    }}
  />
);

export default Toast;
