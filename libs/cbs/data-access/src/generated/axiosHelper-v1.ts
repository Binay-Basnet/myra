import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import { useRefreshToken } from '@coop/cbs/data-access';
import { getDatabaseSlug, getSchemaPath } from '@coop/shared/utils';

import { RootState, useAppSelector } from '../redux/store';

export const axiosAgent = axios.create();

// Request interceptors for API calls
axiosAgent.interceptors.request.use(
  (config) => {
    config.headers = {
      ...config.headers,
      slug: getDatabaseSlug(),
    };
    return config;
  },
  (error) => Promise.reject(error)
);

export const useAxios = <TData, TVariables>(
  query: string
): ((variables?: TVariables, config?: AxiosRequestConfig<TData>) => Promise<TData>) => {
  const url = getSchemaPath();

  if (!url) {
    throw new Error('Server url is missing or Server is Down !!');
  }

  const auth = useAppSelector((state: RootState) => state?.auth);

  const refreshToken = useRefreshToken(url);
  const { accessToken } = auth;

  return async (variables?: TVariables, config?: AxiosRequestConfig<TData>) => {
    if (accessToken) {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      if (config) {
        if (config.headers) {
          config.headers = { ...config.headers, ...headers };
        } else {
          config.headers = { ...headers };
        }
      } else {
        config = {
          headers,
        };
      }
    }
    return axiosAgent
      .post<{ data: TData }>(url, { query, variables }, config)
      .then(
        (
          res: AxiosResponse<{
            data: TData;
            errors?: { message: string }[];
          }>
        ) => {
          if (!res.data.data || res.data.errors) {
            return { error: res.data.errors };
          }
          return res.data.data;
        }
      )
      .catch((err) => {
        if (err.response?.status === 422) {
          return { error: err.response.data.errors };
        }

        if (err.response?.status === 503) {
          return { error: 'Server Error: Database Slug is Missing !' };
        }

        if (err.response && err.response?.status === 401) {
          // assuming that whenever catch blocked is executed this means that the access token is invalid
          return refreshToken().then((newAccessToken) => {
            if (newAccessToken) {
              const headers = {
                Authorization: `Bearer ${newAccessToken}`,
              };

              if (config) {
                if (config.headers) {
                  config.headers = { ...config.headers, ...headers };
                } else {
                  config.headers = { ...headers };
                }
              } else {
                config = {
                  headers,
                };
              }
            }

            return axiosAgent.post<{ data: TData }>(url, { query, variables }, config).then(
              (
                res: AxiosResponse<{
                  data: TData;
                  errors?: { message: string }[];
                }>
              ) => {
                if (!res.data.data || res.data.errors) {
                  return { error: res.data.errors };
                }

                return res.data.data;
              }
            );
          });
        }

        return err;
      });
  };
};
