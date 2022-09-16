import { Renderable, toast as rhToast, ToastOptions } from 'react-hot-toast';

import Toast from './ToastComponent';

interface ToastProps {
  id: string;
  state?: 'success' | 'error' | 'loading' | 'blank';
  type: 'success' | 'error' | 'warning' | 'info';

  options?: ToastOptions;
  message: Renderable;

  actionText?: string;
  actionTextHandler?: () => void;
}

type AuthorizationError = {
  __typename: 'AuthorizationError';
  code: number;
  authorizationErrorMsg: string;
};

type BadRequestError = {
  __typename: 'BadRequestError';
  code: number;
  badRequestErrorMessage: string;
};

type NotFoundError = { __typename: 'NotFoundError'; code: number; notFoundErrorMsg: string };

type ServerError = { __typename: 'ServerError'; code: number; serverErrorMessage: string };

type ValidationError = {
  __typename: 'ValidationError';
  code: number;
  validationErrorMsg: Record<string, Array<string>>;
};

type MutationError =
  | AuthorizationError
  | BadRequestError
  | NotFoundError
  | ServerError
  | ValidationError;

const getError = (error: MutationError) => {
  switch (error.__typename) {
    case 'BadRequestError':
      return error.badRequestErrorMessage;
    case 'AuthorizationError':
      return error.authorizationErrorMsg;
    case 'NotFoundError':
      return error.notFoundErrorMsg;
    case 'ServerError':
      return error.serverErrorMessage;
    default:
      return 'Something Went Wrong';
  }
};

export function toast({ options, id, ...props }: ToastProps) {
  return rhToast.custom(<Toast {...props} />, {
    id,
    duration: 2000,
    ...options,
  });
}

interface AsyncToastProps<T extends Record<string, unknown>> {
  id: string;
  promise: Promise<T>;
  onSuccess?: (response: T) => void;
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
      if ('error' in response) {
        const error = (response as unknown as { error: MutationError[] }).error[0];

        if ('message' in error) {
          toast({
            id,
            type: 'error',
            message: (error as { message: string }).message,
          });
        } else {
          toast({
            id,
            type: 'error',
            message: getError(error),
          });
        }
      } else {
        onSuccess && onSuccess(response);
        toast({
          id,
          type: 'success',
          message: msgs.success ?? 'Successful',
        });
      }
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
