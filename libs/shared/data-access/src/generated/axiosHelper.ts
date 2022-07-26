import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import { useAuth } from '@coop/shared/data-access';

import { RootState } from '../../../utils/src/redux/store';

const useRefreshToken = (url: string) => {
  const history = useRouter();

  const refreshToken = () => {
    const refreshToken = localStorage.getItem('refreshToken');
    return axios
      .post(url, {
        query: `mutation{
  auth{
    token(refreshToken:"${refreshToken}"){
      token{
        access
        refresh
      }
    }
  }
}`,
      })
      .then((res) => {
        return res.data?.access;
      })
      .catch((err) => {
        history.replace('/');
      });
  };

  return refreshToken;
};

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

  const auth = useSelector((state: RootState) => state?.auth);

  const refreshToken = useRefreshToken(url);
  const accessToken = auth?.auth?.accessToken;
  console.log('access', accessToken); // get this token from redux

  return async (variables?: TVariables, config?: AxiosRequestConfig<TData>) => {
    if (accessToken) {
      console.log('hello');
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
        console.log('hello');
        // IF access token is invalid
        // if()

        // // if(res.data)
        if (false) {
          refreshToken().then((res) => {
            console.log('token', res.token);
            const headers = {
              Authorization: `Bearer ${res.token}`,
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

            return axios
              .post<{ data: TData }>(url, { query, variables }, config)
              .then((res) => {
                return res.data.data;
              });
          });
        }

        return res.data.data;
      });
  };
};
