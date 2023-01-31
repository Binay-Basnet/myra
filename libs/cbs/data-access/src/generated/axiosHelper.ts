import axios, { AxiosError, AxiosRequestConfig } from 'axios';

import { getAPIUrl, getDatabaseSlug } from '@coop/shared/utils';

import { logout, saveToken } from '../redux/slices/auth-slice';
import { store } from '../redux/store';

const CODES = {
  BAD_REQUEST_ERROR: 400,
  UNAUTHORIZED_ERROR: 401,
  FORBIDDEN_RESOURCE_ERROR: 403,
  SERVER_ERROR: 500,
  DB_SLUG_MISSING_ERROR: 503,
} as const;

export const axiosAgent = axios.create({
  baseURL: getAPIUrl(),
});

export const privateAgent = axios.create({
  baseURL: getAPIUrl(),
});

axiosAgent.interceptors.request.use(
  (request) => {
    request.headers = {
      ...request.headers,
      slug: getDatabaseSlug(),
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

    if (error.response.status === CODES.UNAUTHORIZED_ERROR && !originalRequest._retry) {
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
        axiosAgent
          .post<RefreshTokenResponse>('/erp/reset-token', {
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
              resolve(axiosAgent(originalRequest));
            } else {
              throw new Error("Tokens didn't arrive from the server");
            }
          })
          .catch((err: AxiosError) => {
            if (err?.response?.status === CODES.BAD_REQUEST_ERROR) {
              store.dispatch(logout());
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

interface IToken {
  access: string;
  refresh: string;
}

interface RefreshTokenResponse {
  token: IToken;
}

export const useAxios =
  <TData, TVariables>(
    query: string
  ): ((
    variables?: TVariables,
    config?: AxiosRequestConfig<TData>
  ) => Promise<TData | { error: { message: string }[] }>) =>
  async (variables?: TVariables, config?: AxiosRequestConfig<TData>) =>
    privateAgent
      .post<{ data: TData; errors: { message: string }[] }>('/query', { query, variables }, config)
      .then((res) => {
        if (!res.data.data || res.data.errors) {
          return { error: res.data.errors };
        }

        return res.data.data;
      });
