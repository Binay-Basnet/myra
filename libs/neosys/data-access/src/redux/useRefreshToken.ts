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
  data: {
    neosys: {
      auth: {
        token: {
          token: IToken;
        };
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
    return privateAgent
      .post<RefreshTokenResponse>(url, {
        query: `mutation {
  neosys {
    auth {
      token(refreshToken: "${refreshToken}") {
        token {
          refresh
          access
        }
        error {
          ... on BadRequestError {
            __typename
            badRequestErrorMessage: message
            jpt: code
          }
          ... on ServerError {
            __typename
            serverErrorMessage: message
            yes: code
          }
          ... on AuthorizationError {
            __typename
            authorizationErrorMsg: message
            no: code
          }
          ... on ValidationError {
            __typename
            validationErrorMsg: message
            haha: code
          }
          ... on NotFoundError {
            __typename
            notFoundErrorMsg: message
            hey: code
          }
        }
      }
    }
  }
}`,
      })
      .then((res) => {
        if (res.data.data.neosys.auth?.token?.token) {
          const accessToken = res.data?.data?.neosys.auth?.token?.token?.access;
          localStorage.setItem('refreshToken', res.data?.data?.neosys.auth?.token?.token?.refresh);
          dispatch(saveToken(accessToken));
          return accessToken;
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
