import React from 'react';
import { Renderable, Toaster as RHToaster } from 'react-hot-toast';
import { Box, Spinner, Text } from '@chakra-ui/react';

import { TOAST_COLORS, TOAST_ICONS } from './utils/constants';
import Icon from '../icon/Icon';

export interface ToastProps {
  message: Renderable;
  type: 'success' | 'error' | 'warning' | 'info';
  state?: 'success' | 'error' | 'loading' | 'blank';

  actionText?: string;
  actionTextHandler?: () => void;
}

export const Toast = ({ message, type, state, actionTextHandler, actionText }: ToastProps) => {
  return (
    <Box
      width="360px"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      boxShadow="E2"
      px="s16"
      bg={TOAST_COLORS[type]}
      borderRadius="br2"
      h="56px"
    >
      <Box display="flex" alignItems="center" gap="s16">
        {state === 'loading' ? (
          <Spinner />
        ) : state === 'blank' ? null : (
          <Icon as={state ? TOAST_ICONS[state] : TOAST_ICONS[type]} size="lg" color="white" />
        )}
        <Text fontSize="r2" color="white" fontWeight="400" noOfLines={1}>
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
}

export const Toaster = () => {
  return (
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
};

export default Toast;
