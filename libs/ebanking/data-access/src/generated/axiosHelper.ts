import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import { RootState, useAppSelector } from '../redux/store';
import { useRefreshToken } from '../redux/useRefreshToken';

export const useAxios = <TData, TVariables>(
  query: string
): ((variables?: TVariables, config?: AxiosRequestConfig<TData>) => Promise<TData>) => {
  let url = process.env['NX_SCHEMA_PATH'] || '';

  if (
    typeof window !== 'undefined' &&
    window.localStorage.getItem('url') &&
    process.env['NX_SCHEMA_PATH']
  ) {
    url = window.localStorage.getItem('url') || process.env['NX_SCHEMA_PATH'];
  }

  const auth = useAppSelector((state: RootState) => state?.auth);

  const refreshToken = useRefreshToken(url);
  const masterToken = auth?.token;
  const coopToken = auth?.cooperative?.token;

  return async (variables?: TVariables, config?: AxiosRequestConfig<TData>) => {
    if (coopToken) {
      const headers = {
        Authorization: `Bearer ${coopToken}`,
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
    } else if (masterToken) {
      const headers = {
        Authorization: `Bearer ${masterToken}`,
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
    return axios
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

            return axios.post<{ data: TData }>(url, { query, variables }, config).then(
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

axios.interceptors.response.use((response) => response);
