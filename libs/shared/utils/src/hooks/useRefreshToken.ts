import { useCallback, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { NextRouter, useRouter } from 'next/router';
import axios from 'axios';

import { logout, saveToken } from '../redux/authSlice';

interface IToken {
  access: string;
  refresh: string;
}
interface RefreshTokenResponse {
  data: {
    auth: {
      token: {
        token: IToken;
      };
    };
  };
}

// https://github.com/vercel/next.js/issues/18127#issuecomment-950907739
// Nextjs Seems to have router memoization problem. so had to create this hook
function useReplace() {
  const router = useRouter();
  const routerRef = useRef(router);
  routerRef.current = router;

  const [{ replace }] = useState<Pick<NextRouter, 'replace'>>({
    replace: (path) => routerRef.current.replace(path),
  });
  return replace;
}

export const useRefreshToken = (url: string) => {
  const replace = useReplace();
  const dispatch = useDispatch();

  const refreshToken = useCallback(() => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) return Promise.reject(() => 'No refresh Token');
    return axios
      .post<RefreshTokenResponse>(url, {
        query: `mutation{
          auth{
            token(refreshToken:"${refreshToken}"){
            token{
              refresh
              access
            }
              error {
                  ... on BadRequestError {
                  __typename
                  badRequestErrorMessage: message
                  jpt:code
                }
                ... on ServerError {
                  __typename
                  serverErrorMessage: message
                  yes:code
                }
                ... on AuthorizationError {
                  __typename
                  authorizationErrorMsg: message
                  no:code
                }
                ... on ValidationError {
                  __typename
                  validationErrorMsg: message
                  haha:code
                }
                ... on NotFoundError {
                  __typename
                  notFoundErrorMsg: message
                  hey:code
                }
            }
            }
          }
        }`,
      })
      .then((res) => {
        if (res.data.data.auth?.token?.token) {
          const accessToken = res.data?.data?.auth?.token?.token?.access;
          localStorage.setItem(
            'refreshToken',
            res.data.data.auth?.token?.token?.refresh
          );
          dispatch(saveToken(accessToken));
          return accessToken;
        }
        replace('/');
        throw new Error('error');
      })
      .catch((err) => {
        replace('/');
        dispatch(logout());
      });
  }, [dispatch, replace, url]);

  return refreshToken;
};
