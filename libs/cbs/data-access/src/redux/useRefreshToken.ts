import { useCallback, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { NextRouter, useRouter } from 'next/router';

import { saveToken } from './slices/auth-slice';
import { axiosAgent } from '../generated/axiosHelper';

interface IToken {
  access: string;
  refresh: string;
}

interface RefreshTokenResponse {
  token: IToken;
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
    return axiosAgent
      .post<RefreshTokenResponse>(`${process.env['NX_SCHEMA_PATH']}/erp/reset-token`, {
        refreshToken,
      })
      .then((res) => {
        const tokens = res.data?.token;

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
      });
  }, [dispatch, replace, url]);

  return refreshTokenPromise;
};
