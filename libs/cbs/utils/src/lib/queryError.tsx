import { flatten, has, map } from 'lodash';

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

export type QueryError = AuthorizationError | BadRequestError | NotFoundError | ServerError;

export const getQueryError = (error: QueryError) => {
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

export function findQueryError(obj: Record<string, unknown> | null, key: string): QueryError[] {
  if (has(obj, key) && obj) return obj[key] as QueryError[];

  return flatten(
    map(obj, (v) =>
      typeof v === 'object' ? findQueryError(v as Record<string, unknown>, key) : []
    )
  );
}
