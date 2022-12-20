import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import {
  authenticate,
  logout,
  setPreference,
  useAppDispatch,
  useGetMeQuery,
  useRefreshToken,
} from '@coop/cbs/data-access';
import { getSchemaPath, useReplace } from '@coop/shared/utils';

const url = getSchemaPath();

export const useInit = () => {
  const [isLoading, setIsLoading] = useState(true);
  const route = useRouter();
  const [triggerQuery, setTriggerQuery] = React.useState(false);
  const dispatch = useAppDispatch();
  const replace = useReplace();

  const getMe = useGetMeQuery(
    {},
    {
      enabled: triggerQuery,
    }
  );

  const refreshToken = useRefreshToken(url ?? '');

  const hasDataReturned = getMe?.data?.auth;
  const userData = getMe?.data?.auth?.me?.data?.user;
  const preference = getMe?.data?.auth?.me?.data?.preference;
  const hasData = getMe?.data?.auth?.me?.data;

  useEffect(() => {
    refreshToken()
      .then((res) => {
        if (res) {
          setTriggerQuery(true);
        }
      })
      .catch(() => {
        if (route?.pathname.includes('password-recovery')) {
          setIsLoading(false);
          return;
        }
        dispatch(logout());
        replace('/login').then(() => setIsLoading(false));
      });
  }, [dispatch, refreshToken, replace]);

  useEffect(() => {
    if (hasDataReturned) {
      if (userData) {
        dispatch(authenticate({ user: userData }));
        preference && dispatch(setPreference({ preference }));
        setIsLoading(false);
      } else {
        dispatch(logout());
        replace('/login').then(() => setIsLoading(false));
      }
    }
  }, [dispatch, hasDataReturned, hasData, userData, replace]);

  return { isLoading };
};
