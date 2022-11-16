import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import { EBankingTokenType, useRefreshToken } from '@coop/ebanking/data-access';
import { getSchemaPath } from '@coop/shared/utils';

import { RootState, useAppSelector } from '../../redux/store';

// // Request interceptors for API calls
// axios.interceptors.request.use(
//   (config) => {
//     config.headers = {
//       ...config.headers,
//       slug: typeof window !== 'undefined' ? window.location.host.split('.')[0] : '',
//     };
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

export const useAxios = <TData, TVariables>(
  query: string
): ((variables?: TVariables, config?: AxiosRequestConfig<TData>) => Promise<TData>) => {
  const url = getSchemaPath();

  if (!url) {
    throw new Error('Server url is missing or Server is Down !!');
  }

  const auth = useAppSelector((state: RootState) => state?.auth);

  const masterToken = auth?.token;
  const refreshToken = useRefreshToken(url, EBankingTokenType.Myra);

  return async (variables?: TVariables, config?: AxiosRequestConfig<TData>) => {
    if (masterToken) {
      const headers = {
        Authorization: `Bearer ${masterToken}`,
      };

      if (config) {
        if (config.headers) {
          config.headers = { ...config.headers, ...headers };
        }
        config.headers = { ...headers };
      }
      config = { headers };
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
                }
                config.headers = { ...headers };
              }
              config = { headers };
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
