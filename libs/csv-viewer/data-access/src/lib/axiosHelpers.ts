import Router from 'next/router';
import axios, { AxiosError } from 'axios';

import { logout, saveToken, store } from '@coop/csv-viewer/data-access';
import { getAPIUrl, getDatabaseSlug } from '@coop/shared/utils';

interface IToken {
  access: string;
  refresh: string;
}

interface RefreshTokenResponse {
  token: IToken;
}

export const publicAgent = axios.create({
  baseURL: getAPIUrl(),
});

export const privateAgent = axios.create({
  baseURL: getAPIUrl(),
});

publicAgent.interceptors.request.use(
  (request) => {
    request.headers = {
      ...request.headers,
      slug: 'myra-prod',
    };
    return request;
  },
  (error) => Promise.reject(error)
);

privateAgent.interceptors.request.use(
  (request) => {
    request.headers = {
      ...request.headers,
      Authorization: `Bearer ${store.getState().auth.accessToken}`,
      slug: getDatabaseSlug(),
    };
    return request;
  },
  (error) => Promise.reject(error)
);

let isRefreshing = false;
let failedQueue: { resolve: (value: unknown) => void; reject: (reason?: unknown) => void }[] = [];

const processQueue = (error: unknown, token?: string | null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};
privateAgent.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers['Authorization'] = `Bearer ${token}`;
            return privateAgent(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = window.localStorage.getItem('refreshToken');
      return new Promise((resolve, reject) => {
        publicAgent
          .post<RefreshTokenResponse>('/newtoken', {
            refreshToken,
          })
          .then(({ data }) => {
            const tokens = data.token;

            if (tokens && tokens.access) {
              store.dispatch(
                saveToken({
                  accessToken: tokens.access,
                  refreshToken: tokens.refresh,
                })
              );
              privateAgent.defaults.headers.common['Authorization'] = `Bearer ${data.token.access}`;
              originalRequest.headers['Authorization'] = `Bearer ${data.token.access}`;
              processQueue(null);
              resolve(privateAgent(originalRequest));
            } else {
              throw new Error("Tokens didn't arrive from the server");
            }
          })
          .catch((err: AxiosError) => {
            if (err?.response?.status === 400) {
              if (!Router.asPath.includes('login')) {
                Router.replace(
                  {
                    pathname: '/login',
                    query: {
                      redirect: Router.asPath,
                    },
                  },
                  '/login'
                ).then(() => {
                  store.dispatch(logout());
                });
              }
            }

            processQueue(err, null);
            reject(err);
          })
          .finally(() => {
            isRefreshing = false;
          });
      });
    }

    return Promise.reject(error);
  }
);
