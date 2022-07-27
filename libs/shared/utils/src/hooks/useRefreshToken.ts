import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import axios from 'axios';

import { saveToken } from '../redux/authSlice';

interface IToken {
  access: string;
  refresh: string;
}
interface RefreshTokenResponse {
  data: {
    auth: {
      token: {
        token: IToken;
      };
    };
  };
}
export const useRefreshToken = (url: string) => {
  const history = useRouter();
  const dispatch = useDispatch();

  const refreshToken = useCallback(() => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) return Promise.reject(() => 'No refresh Token');
    return axios
      .post<RefreshTokenResponse>(url, {
        query: `mutation{
          auth{
            token(refreshToken:"${refreshToken}"){
            token{
              refresh
              access
            }
            }
          }
        }`,
      })
      .then((res) => {
        console.log('fuck o res', res);

        const accessToken = res.data?.data?.auth?.token?.token?.access;
        localStorage.setItem(
          'refreshToken',
          res.data.data.auth?.token?.token?.refresh
        );
        dispatch(saveToken(accessToken));
        return accessToken;
      })
      .catch((err) => {
        history.replace('/');
      });
  }, [dispatch, history, url]);

  return refreshToken;
};
