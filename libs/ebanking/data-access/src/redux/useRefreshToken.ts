import { useCallback, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { NextRouter, useRouter } from 'next/router';
import axios from 'axios';

import { EBankingTokenType, logoutCooperative } from '@coop/ebanking/data-access';

import { logout, saveCoopToken, saveToken } from './slices/auth-slice';

interface IToken {
  access: string;
  refresh: string;
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

    return axios
      .post<RefreshTokenResponse>(url, {
        query: `mutation {
  eBanking {
    auth {
      getNewToken(refreshToken: "${refreshToken}", tokenFor: ${type} ) {
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

          if (type === EBankingTokenType.Myra) {
            localStorage.setItem(
              'master-refreshToken',
              res.data?.data?.eBanking.auth?.getNewToken?.token?.refresh
            );
            dispatch(saveToken(accessToken));
          } else {
            localStorage.setItem(
              'coop-refreshToken',
              res.data?.data?.eBanking.auth?.getNewToken?.token?.refresh
            );
            dispatch(saveCoopToken(accessToken));
          }

          return accessToken;
        }
        if (type === EBankingTokenType.Myra) {
          replace('/login');
          throw new Error('Credentials are Expired!!');
        } else {
          replace('/login/coop');
          throw new Error('Credentials are Expired!!');
        }
      })
      .catch(() => {
        if (type === EBankingTokenType.Myra) {
          replace('/login');
          dispatch(logout());
        } else {
          replace('/login/coop');
          dispatch(logoutCooperative());
        }
      });
  }, [dispatch, replace, url]);

  return refreshTokenPromise;
};
