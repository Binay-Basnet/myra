import { useCallback, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { NextRouter, useRouter } from 'next/router';
import { AxiosError } from 'axios';

import { getAPIUrl } from '@coop/shared/utils';

import { publicAgent } from './axiosHelpers';
import { saveToken } from '../redux/slices/auth-slice';

interface RefreshTokenResponse {
  access_token: string;
  refresh_token: string;
}

// https://github.com/vercel/next.js/issues/18127#issuecomment-950907739
// Next.js Seems to have router memoization problem. so had to create this hook
function useReplace() {
  const router = useRouter();
  const routerRef = useRef(router);
  routerRef.current = router;

  const [{ replace }] = useState<Pick<NextRouter, 'replace'>>({
    replace: (path, as) => routerRef.current.replace(path, as),
  });
  return replace;
}

const schemaPath = getAPIUrl();

export const useRefreshToken = (url: string) => {
  const replace = useReplace();
  const dispatch = useDispatch();

  const refreshTokenPromise = useCallback(() => {
    const refreshToken = localStorage.getItem('refreshToken');
    // eslint-disable-next-line prefer-promise-reject-errors
    if (!refreshToken) return Promise.reject(() => 'No refresh Token');
    return publicAgent
      .post<RefreshTokenResponse>(`${schemaPath}/newtoken`, {
        refresh_token: refreshToken,
      })
      .then((res) => {
        const tokens = res.data;

        if (tokens) {
          dispatch(
            saveToken({
              accessToken: tokens.access_token,
              refreshToken: tokens.refresh_token,
            })
          );

          return tokens.access_token;
        }
        throw new Error('Credentials are Expired!!');
      })
      .catch((e: AxiosError) => {
        if (e.response?.status === 400) {
          throw new Error('Credentials are Expired!!');
        }
      });
  }, [dispatch, replace, url]);

  return refreshTokenPromise;
};
