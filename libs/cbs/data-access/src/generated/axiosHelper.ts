import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import _ from 'lodash';

import { MutationError, useRefreshToken } from '@coop/cbs/data-access';

import { RootState, useAppSelector } from './hooks/store';

function fn(obj: Record<string, unknown> | null, key: string): MutationError[] {
  if (_.has(obj, key) && obj) return [obj[key]] as MutationError[];

  return _.flatten(
    _.map(obj, (v) => (typeof v === 'object' ? fn(v as Record<string, unknown>, key) : []))
  );
}

export const useAxios = <TData, TVariables>(
  query: string
): ((variables?: TVariables, config?: AxiosRequestConfig<TData>) => Promise<TData>) => {
  // it is safe to call React Hooks here.
  // const { url, headers } = React.useContext(FetchParamsContext)

  let url = process.env['NX_SCHEMA_PATH'] || '';

  if (
    typeof window !== 'undefined' &&
    window.localStorage.getItem('url') &&
    process.env['NX_SCHEMA_PATH']
  ) {
    url = window.localStorage.getItem('url') || process.env['NX_SCHEMA_PATH'];
  }

  // return axios.post<TData>(url,data:{query,variables}).then((res) => res.data);

  const auth = useAppSelector((state: RootState) => state?.auth);

  const refreshToken = useRefreshToken(url);
  const accessToken = auth.token;

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
          }
          const errArr = fn(res.data.data as Record<string, unknown>, 'error');

          if (errArr.length === 0) {
            return res.data.data;
          }
          return { error: errArr };
        }
      )
      .catch((err) => {
        // assuming that whenever catch blocked is executed this means that the access token is invalid
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

          return axios.post<{ data: TData }>(url, { query, variables }, config).then(
            (
              res: AxiosResponse<{
                data: TData;
                errors?: { message: string }[];
              }>
            ) => {
              if (!res.data.data || res.data.errors) {
                return res.data.errors;
              }
              return res.data.data;
            }
          );
        });

        return err;
      });
  };
};

axios.interceptors.response.use((response) => response);
