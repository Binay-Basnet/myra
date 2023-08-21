import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { getSchemaPath, useReplace } from '@coop/shared/utils';

import { authenticate, logout } from './slices/auth-slice';
import { useAppDispatch } from './store';
import { useRefreshToken } from './useRefreshToken';
import { useGetMeQuery } from '../generated/graphql';

const url = getSchemaPath();

export const useInit = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [triggerQuery, setTriggerQuery] = React.useState(false);
  const dispatch = useAppDispatch();
  const replace = useReplace();
  const { asPath, isReady } = useRouter();

  const getMe = useGetMeQuery(
    {},
    {
      enabled: triggerQuery,
    }
  );

  const refreshToken = useRefreshToken(url ?? '');

  const hasDataReturned = getMe?.data?.employee?.auth;
  const hasData = getMe?.data?.employee?.auth?.me?.data;

  const loginRecord = getMe?.data?.employee?.auth?.me;
  const loginData = loginRecord?.data;

  const userData = loginData?.user;

  useEffect(() => {
    const getRefreshToken = async () => {
      try {
        const response = await refreshToken();

        if (response) {
          setTriggerQuery(true);
        }
      } catch (e) {
        replace(
          {
            pathname: '/login',
            query: {
              redirect: asPath,
            },
          },
          '/login'
        ).then(() => {
          dispatch(logout());
          setIsLoading(false);
        });
      }
    };

    // next.js renders twice for dynamic pages since it takes time to fill dynamic fields such as [action]
    if (!isReady) {
      return;
    }

    if (asPath.includes('login') || asPath.includes('password-recovery')) {
      setIsLoading(false);
      return;
    }

    getRefreshToken();
  }, [isReady]);

  useEffect(() => {
    if (!isReady) return;

    if (hasDataReturned) {
      if (userData) {
        dispatch(
          authenticate({
            user: userData,
          })
        );

        setIsLoading(false);
      } else {
        if (asPath.includes('password-recovery') || asPath.includes('login')) {
          setIsLoading(false);
          return;
        }

        replace(
          {
            pathname: '/login',
            query: {
              redirect: asPath,
            },
          },
          '/login'
        ).then(() => {
          dispatch(logout());
          setIsLoading(false);
        });
      }
    }
  }, [dispatch, hasDataReturned, hasData, userData, isReady]);

  return { isLoading };
};
