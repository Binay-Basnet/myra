import rhToast, { Renderable, ToastOptions } from 'react-hot-toast';
import _ from 'lodash';

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

export type MutationError =
  | AuthorizationError
  | BadRequestError
  | NotFoundError
  | ServerError
  | ValidationError;

export const getError = (error: MutationError) => {
  switch (error.__typename) {
    case 'ValidationError':
      return error.validationErrorMsg;
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

export function findError(obj: Record<string, unknown> | null, key: string): MutationError[] {
  if (_.has(obj, key) && obj) return obj[key] as MutationError[];

  return _.flatten(
    _.map(obj, (v) => (typeof v === 'object' ? findError(v as Record<string, unknown>, key) : []))
  );
}

export function toast({ options, id, ...props }: ToastProps) {
  return rhToast.custom(<Toast {...props} />, {
    id,
    duration: props.state === 'loading' ? Infinity : 5000,
    ...options,
  });
}

interface AsyncToastProps<T extends Record<string, unknown>> {
  id: string;
  promise: Promise<T>;
  onSuccess?: (response: T) => void;
  onError?: (error: MutationError, response: T) => void;
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
  onError,
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
        if (typeof response['error'] === 'string') {
          toast({
            id,
            type: 'error',
            message: response['error'],
          });
          return;
        }
        toast({
          id,
          type: 'error',
          message:
            (response as unknown as { error: { message: string }[] }).error[0].message ?? errMsg,
        });
      } else {
        const errorKeys = findError(response, 'error');

        if (errorKeys[0]) {
          const error = getError(errorKeys[0]);

          if (typeof error === 'string') {
            onError && onError(errorKeys[0], response);
            toast({
              id,
              type: 'error',
              message: error,
            });
          } else {
            onError && onError(errorKeys[0], response);
            toast({
              id,
              type: 'error',
              message: 'Some fields are empty or invalid',
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
