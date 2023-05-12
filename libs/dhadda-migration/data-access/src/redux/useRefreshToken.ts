import { useCallback, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { NextRouter, useRouter } from 'next/router';
import axios from 'axios';

import { logout, saveToken } from './slices/auth-slice';

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
// Next.js Seems to have router memoization problem. so had to create this hook
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

  const refreshTokenPromise = useCallback(() => {
    const refreshToken = localStorage.getItem('refreshToken');
    // eslint-disable-next-line prefer-promise-reject-errors
    if (!refreshToken) return Promise.reject(() => 'No refresh Token');
    return axios
      .post<RefreshTokenResponse>(url, {
        query: `mutation{
            newtoken(refresh_token:"${refreshToken}"){
              accessToken
              refreshToken
              name
              email
          }
        }`,
      })
      .then((res) => {
        const tokens = res.data?.data?.auth?.token?.token;

        if (tokens) {
          dispatch(
            saveToken({
              accessToken: tokens.access,
              refreshToken: tokens.refresh,
            })
          );

          return tokens.access;
        }
        replace('/login');
        throw new Error('Credentials are Expired!!');
      })
      .catch(() => {
        replace('/login');
        dispatch(logout());
      });
  }, [dispatch, replace, url]);

  return refreshTokenPromise;
};
