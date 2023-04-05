import { useCallback, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { NextRouter, useRouter } from 'next/router';
import axios from 'axios';

import { EBankingTokenType, saveCoopToken, store } from '@coop/ebanking/data-access';
import { getAPIUrl } from '@coop/shared/utils';

import { saveToken } from './slices/auth-slice';

interface IToken {
  access: string;
  refresh: string;
}

interface RefreshTokenREST {
  token: IToken;
}

interface RefreshTokenResponse {
  data: {
    eBanking: {
      auth: {
        getNewToken: {
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

const privateAgent = axios.create({});
// Request interceptors for API calls
privateAgent.interceptors.request.use(
  (config) => {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${store.getState().auth.token}` as string,
      Slug: 'neosys',
    };
    return config;
  },
  (error) => Promise.reject(error)
);

const axiosAgent = axios.create({});
// Request interceptors for API calls
axiosAgent.interceptors.request.use(
  (config) => {
    config.headers = {
      ...config.headers,
      Slug: 'neosys',
    };
    return config;
  },
  (error) => Promise.reject(error)
);

export const useRefreshToken = (url: string, type: EBankingTokenType = EBankingTokenType.Myra) => {
  const replace = useReplace();
  const dispatch = useDispatch();

  const refreshTokenPromise = useCallback(() => {
    const refreshToken =
      type === EBankingTokenType.Myra
        ? localStorage.getItem('master-refreshToken')
        : localStorage.getItem('coop-refreshToken');
    // eslint-disable-next-line prefer-promise-reject-errors
    if (!refreshToken) return Promise.reject(() => 'No refresh Token');

    if (type === EBankingTokenType.Myra) {
      return axiosAgent
        .post<RefreshTokenREST>(`${getAPIUrl()}/ebanking/reset-token`, {
          refreshToken,
        })
        .then((res) => {
          if (res?.data?.token) {
            const accessToken = res.data?.token?.access;

            localStorage.setItem('master-refreshToken', res.data?.token?.refresh);
            dispatch(saveToken(accessToken));

            return accessToken;
          }
          replace('/login');
          throw new Error('Credentials are Expired!!');
        });
    }

    return privateAgent
      .post<RefreshTokenResponse>(url, {
        query: `mutation {
  eBanking {
    auth {
      getNewToken(refreshToken: "${refreshToken}", tokenFor: ${type}, slug: "${localStorage.getItem(
          'db'
        )}" ) {
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
        if (res.data.data?.eBanking?.auth?.getNewToken?.token) {
          const accessToken = res.data?.data?.eBanking.auth?.getNewToken?.token?.access;

          localStorage.setItem(
            'coop-refreshToken',
            res.data?.data?.eBanking.auth?.getNewToken?.token?.refresh
          );
          dispatch(saveCoopToken(accessToken));

          return accessToken;
        }

        replace('/login/coop');
        throw new Error('Credentials are Expired!!');
      });
  }, [dispatch, replace, url]);

  return refreshTokenPromise;
};
