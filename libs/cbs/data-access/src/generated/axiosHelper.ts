import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import { RootState, useAppSelector } from './hooks/store';
import { useRefreshToken } from './hooks/useRefreshToken';

export const useAxios = <TData, TVariables>(
  query: string
): ((
  variables?: TVariables,
  config?: AxiosRequestConfig<TData>
) => Promise<TData>) => {
  // it is safe to call React Hooks here.
  // const { url, headers } = React.useContext(FetchParamsContext)

  let url = process.env['NX_SCHEMA_PATH'] || '';

  if (typeof window !== 'undefined') {
    url = window.localStorage.getItem('url') || process.env['NX_SCHEMA_PATH'];
  }

  // return axios.post<TData>(url,data:{query,variables}).then((res) => res.data);

  const auth = useAppSelector((state: RootState) => state?.auth);

  const refreshToken = useRefreshToken(url);
  const accessToken = auth.token;

  // alert('chalyo');

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
    return axios
      .post<{ data: TData }>(url, { query, variables }, config)
      .then(
        (
          res: AxiosResponse<{
            data: TData;
            errors?: { message: string }[];
          }>
        ) => {
          if (!res.data.data) {
            return { error: res.data.errors };
          } else {
            return res.data.data;
          }
        }
      )
      .catch((err) => {
        // assumin that whenever catch blocked is executed this means that the access token is invalid
        return refreshToken().then((accessToken) => {
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

          return axios
            .post<{ data: TData }>(url, { query, variables }, config)
            .then(
              (
                res: AxiosResponse<{
                  data: TData;
                  errors?: { message: string }[];
                }>
              ) => {
                if (!res.data.data) {
                  return res.data.errors;
                } else {
                  return res.data.data;
                }
              }
            );
        });

        return err;
      });
  };
};

axios.interceptors.response.use(function (response) {
  return response;
});
