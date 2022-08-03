import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import { useAuth } from '@coop/cbs-data-access';

import { useRefreshToken } from '../../../utils/src/hooks/useRefreshToken';
import { RootState, useAppSelector } from '../../../utils/src/redux/store';

export const useAxios = <TData, TVariables>(
  query: string
): ((
  variables?: TVariables,
  config?: AxiosRequestConfig<TData>
) => Promise<TData>) => {
  // it is safe to call React Hooks here.
  // const { url, headers } = React.useContext(FetchParamsContext)
  const url = process.env['NX_SCHEMA_PATH'] ?? '';
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
      .then((res: AxiosResponse<{ data: TData; errors?: any[] }>) => {
        return res.data.data;
      })
      .catch((err) => {
        //assumin that whenever catch blocked is executed this means that the access token is invalid
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
            .then((res) => {
              return res.data.data;
            });
        });

        return err;
      });
  };
};

axios.interceptors.response.use(function (response) {
  return response;
});
