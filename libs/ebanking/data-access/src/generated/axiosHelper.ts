import { useRouter } from 'next/router';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import { EBankingTokenType } from '@coop/ebanking/data-access';

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
  const router = useRouter();

  const auth = useAppSelector((state: RootState) => state?.auth);

  const masterToken = auth?.token;
  const coopToken = auth?.cooperative?.token;
  const refreshToken = useRefreshToken(
    url,
    coopToken ? EBankingTokenType.Cooperative : EBankingTokenType.Myra
  );

  return async (variables?: TVariables, config?: AxiosRequestConfig<TData>) => {
    if (
      coopToken &&
      !router.pathname.includes('setup') &&
      !router.pathname.includes('login') &&
      !router.pathname.includes('sign-up') &&
      !router.pathname.includes('switch')
    ) {
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
