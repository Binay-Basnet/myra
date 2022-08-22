import React from 'react';
import { Renderable, toast as rhToast, ToastOptions } from 'react-hot-toast';

import Toast from '../toast/ToastComponent';

interface ToastProps {
  id: string;
  state?: 'success' | 'error' | 'loading' | 'blank';
  type: 'success' | 'error' | 'warning' | 'info';

  options?: ToastOptions;
  message: Renderable;

  actionText?: string;
  actionTextHandler?: () => void;
}

export function toast({ options, id, ...props }: ToastProps) {
  return rhToast.custom(<Toast {...props} />, {
    id,
    duration: 6000,
    ...options,
  });
}

interface AsyncToastProps<T extends Record<string, unknown>> {
  id: string;
  promise: Promise<T>;
  onSuccess: (response: T) => void;
  msgs: {
    loading: Renderable;
    success: Renderable;
    error?: Renderable;
  };
}

export const asyncToast = async <T extends Record<string, unknown>>({
  id,
  msgs,
  onSuccess,
  promise,
}: AsyncToastProps<T>) => {
  const errMsg = 'Something Went Wrong!!';

  toast({
    id,
    type: 'success',
    state: 'loading',
    message: msgs.loading ?? 'Loading',
  });

  try {
    const response = await promise;
    if (response) {
      onSuccess && onSuccess(response);
      toast({
        id,
        type: 'success',
        message: msgs.success ?? 'Successful',
      });
    }
    // TODO! ERROR HANDLE HERE!!!!
  } catch (e: unknown) {
    toast({
      id,
      type: 'error',
      message: (e as { message: string }).message ?? errMsg,
    });
  }
};
