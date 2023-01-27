import { useCallback, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { NextRouter, useRouter } from 'next/router';

import { privateAgent } from '@coop/neosys-admin/data-access';

import { logout, saveToken } from './slices/auth-slice';

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
  const router = useRouter();
  const dispatch = useDispatch();

  const refreshTokenPromise = useCallback(() => {
    const refreshToken = localStorage.getItem('refreshToken');
    // eslint-disable-next-line prefer-promise-reject-errors
    if (!refreshToken) return Promise.reject(() => 'No refresh Token');
    return privateAgent
      .post<RefreshTokenResponse>(`${process.env['NX_SCHEMA_PATH']}/neosys/reset-token`, {
        refreshToken,
      })
      .then((res) => {
        const tokens = res.data?.token;

        if (tokens && tokens?.refresh && tokens?.access) {
          localStorage.setItem('refreshToken', tokens.refresh);
          dispatch(saveToken(tokens.access));
          return tokens?.access;
        }

        replace(
          {
            query: {
              redirect: router.asPath,
            },
          },
          '/login'
        );
        throw new Error('Credentials are Expired!!');
      })
      .catch(() => {
        replace(
          {
            query: {
              redirect: router.asPath,
            },
          },
          '/login'
        );
        dispatch(logout());
      });
  }, [dispatch, replace, url]);

  return refreshTokenPromise;
};
